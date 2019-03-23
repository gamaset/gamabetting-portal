import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import 'moment/locale/pt-br';

import './game-list.css';

type Props = {
    events: Array<any>,
    getBet: () => any
};

moment.locale('pt-br');

class GameList extends Component<Props> {

    constructor() {
        super();
        this.state = {
            value: "",
            toggle: false,
            isSelected: false,
            selectedId: ""
        };
      }

    async loadName(event) {
        this.setState(
        { 
            value: event.currentTarget.getAttribute('value'),
            odd: event.currentTarget.getAttribute('odd')
        });

        // console.log('Value', event.currentTarget.getAttribute('value'));
        // console.log('Odd', event.currentTarget.getAttribute('odd'));
    }

    teste(info, e) {
        this.props.getBet(info);
        this.addToggle(e);
    }

    async addToggle(elem) {
        const isToggle = this.state.toggle;
        await this.setState({selectedId: elem.currentTarget.getAttribute('id')})
        console.log('Id', this.state.selectedId);
    }

    render() {
        const { events } = this.props;
        const { selectedId } = this.state;

        console.log('id', selectedId);
        return (
            <React.Fragment>
                <div className="list">
                    { events && events.map((game, i) => 
                    <div className="list__container" id={i} key={i}>
                        <div className={this.state.toggle ? `list__title ${this.state.toggle}` : "list__title"} onClick={() => this.addToggle(game) }><span className="list__title--icon"><FontAwesomeIcon icon="futbol"/></span>{game.competition.description}</div>
                        <div className="list__content">
                            {
                                game.events.map((event, eventIndex) => {
                                    return <div className="items" id={event.id} key={eventIndex}>
                                        <div className="teams">
                                            <FontAwesomeIcon icon="futbol"/>
                                            <div className="teams__info">
                                                <p className="teams--home">{event.name}</p>
                                            </div>
                                            <div className="game">
                                                <p className="game--date">{moment(event.openDate).format(`DD [de] MMMM`)}</p>
                                                <p className="game--hour">17:45</p>
                                            </div>
                                        </div>
                                        <div className="challenges">
                                            {
                                                event.markets[0].prices.map((bet, priceIndex) => {
                                                    const gameInfo = function(selectionName, odd){
                                                       return { 
                                                            eventName: event.name,
                                                            eventId: event.id,
                                                            eventDate: event.openDate,
                                                            competition: {
                                                              id: game.competition.id,
                                                              description: game.competition.name
                                                            },
                                                            market: {
                                                              marketId: event.markets[0].marketId,
                                                              marketName: event.markets[0].marketName,
                                                              price: {
                                                                selectionId: bet.selectionId,
                                                                selectionName: selectionName,
                                                                odd: odd
                                                            }
                                                            }
                                                        }
                                                    }

                                                        return <div className={`challenges__bet ${selectedId === priceIndex ? true : false}`} id={priceIndex} key={priceIndex} onClick={(e) => this.teste(gameInfo(bet.selectionName, bet.odd), e)}>
                                                        <span className="team__title">{bet.selectionName}</span>
                                                        <span className="team__odd">{bet.odd}</span>

                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="detail">
                                            <Link to="#"><FontAwesomeIcon icon="arrow-alt-circle-right" size="2x"/></Link>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        </div>
                    )
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default GameList;