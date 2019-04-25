import React, { Component } from 'react';

import Moon from './connection/Moon';
const moon = new Moon();


class CoveredAreaCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinces: [],
            cities: [],
            checkedCities: [],
            sendCities: [],
        };
    }

    componentDidMount() {
        const showProvArea = [];
        const showCitiesArea = [];
        const checkedCities = [];
        let provId = '';

        moon
            .get('api/area/all')
            .then(res => {

                const showProvArea = [];
                const provData = res.data;
                console.log(provData);
                for (const prov of provData) {

                    showProvArea.push({
                        id: prov._id,
                        name: prov.name
                    })

                    provId = prov._id;


                    // .catch(err => {
                    //     this.disabledInput();
                    //     console.log(JSON.stringify(err));
                    // })

                }
                console.log("🐥" + provId);
                this.setState({ provinces: showProvArea, }, () => {
                    console.log("🐷" + JSON.stringify(this.state.provinces));
                })
            })
        console.log("🐥" + provId);
    }


    // handleAllChecked = (e) => {
    //
    //     const provId = e.target.value;
    //     const isProvChecked = e.target.checked;
    //     this.setState(prevState => ({ provChecked: prevState.provChecked.set(provId, isProvChecked) }));
    //     console.log("🍖" + [...this.state.provChecked]);
    //
    //
    //     console.log("🍊" + this.state.showCitiesArea);
    //     // if(isProvChecked === true && provId === ) {
    //     //     this.setState({ citiesChecked: true })
    //     // }
    //
    // }


    render() {

        return(
            <div>

                {this.state.provinces.map((prov, index) => {
                    return (
                        <div className="coveredarea">
                            <ul className="input__parent">
                                <li>
                                    <h1>{prov.name}</h1>
                                    <input type="checkbox" value={prov.id} onClick={this.handleAllChecked}/>all

                                    <ul>
                                        {prov.cities ? (
                                            prov.cities.map((city, index) => {

                                                return (

                                                    <li>
                                                        <input type="checkbox" value={city.id} checked={this.state.citiesChecked}/>{city.name}
                                                        <br/>
                                                    </li>
                                                )
                                            })
                                        ) : ( " " )
                                        }
                                    </ul>

                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default CoveredAreaCheckbox;