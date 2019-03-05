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
            value: ""
        };
      }

    async loadName(event) {
        this.setState(
        { 
            value: event.currentTarget.getAttribute('value'),
            odd: event.currentTarget.getAttribute('odd')
        });

        console.log('Value', event.currentTarget.getAttribute('value'));
        console.log('Odd', event.currentTarget.getAttribute('odd'));
    }

    render() {
        const { events } = this.props;

        return (
            <div>
                <ul>
                    { events && events.map((game, i) => 
                    <div>
                        <p className="list__title" key={i}><span className="list__title--icon"><FontAwesomeIcon icon="futbol"/></span>{game.competition.name}</p>
                        <div>
                            {
                                game.events.map((event, eventIndex) => {
                                    return <li className="items" id={event.id} key={eventIndex}>
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
                                                            competition: {
                                                              id: event.competition.id,
                                                              description: event.competition.name
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

                                                        return <div className="challenges__bet win--home" key={priceIndex} onClick={() => this.props.getBet(gameInfo(bet.selectionName, bet.odd))}>
                                                        <span className="team__title">{bet.selectionName}</span>
                                                        <span className="team__odd">{bet.odd}</span>

                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="detail">
                                            <Link to="#"><FontAwesomeIcon icon="arrow-alt-circle-right" size="2x"/></Link>
                                        </div>
                                    </li>
                                })
                            }
                        </div>
                    </div>
                    )
                    }
                </ul>
            </div>
        )
    }
}

export default GameList;