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

        moon
            .get('api/area/cities/all')
            .then(res => {

                //get city data
                for (let i = 0; i < res.data.length; i++) {

                    showProvArea.push({
                        id: res.data[i].area_id._id,
                    });

                    showCitiesArea.push({
                        city: res.data[i].city,
                        id: res.data[i].area_id._id,
                        prov: res.data[i].area_id.name
                    });

                    const id = res.data[i].area_id._id;

                    checkedCities[id] = new Set();

                    // .catch(err => {
                    //     this.disabledInput();
                    //     console.log(JSON.stringify(err));
                    // })
                }

                this.setState({ provinces: showProvArea, cities: showCitiesArea, checkedCities: checkedCities, }, () => {
                    console.log("🐷" + JSON.stringify(this.state.provinces));
                    console.log("🐶" + JSON.stringify(this.state.cities));
                })

            })
    }


    handleChange = (provId) => (event) => {

        const { name } = event.target;
        const { checkedCities } = this.state;
        const label = Number(name);

        if (checkedCities[provId].has(label)) {
            checkedCities[provId].delete(label);
        } else {
            checkedCities[provId].add(label);
        }
        this.setState({ checkedCities: checkedCities}
        );
    };

    handleAllChange = (event) => {
        const { name, checked } = event.target;
        const { cities, checkedCities } = this.state;

        if (checked) {
            for (const city of cities[`city${name}`]) {
                checkedCities[`city${name}`].add(city._id);
            }
        } else {
            checkedCities[`city${name}`].clear();
        }
        this.setState({ checkedCities: checkedCities });
    };

    send = () => {
        const { checkedCities } = this.state;
        let arr = [];
        Object.keys(checkedCities).forEach((provId) => {
            arr = arr.concat(Array.from(checkedCities[provId]));
        });
        this.setState({ sendCities: arr });
    };


    render() {
        const { provinces, cities, checkedCities } = this.state;
        const list = [];

        for (const prov of provinces) {
            list.push(
                <div key={prov.id}>
                    <h1>{prov.prov}</h1>
                    <div>
                        <div>
                            <input
                                name={prov.id}
                                type="checkbox"
                                checked={checkedCities[`city${prov.id}`].size >= cities[`city${prov.id}`].length}
                                onChange={this.handleAllChange}
                            />
                            <label>all</label>
                        </div>
                        {
                            cities[`city${prov.id}`].map((city) => {
                                return (
                                    <div key={city._id}>
                                        <input
                                            name={city._id}
                                            type="checkbox"
                                            checked={checkedCities[`city${prov.id}`].has(city._id)}
                                            onChange={this.handleChange(prov.id)}
                                        />
                                        <label>{city.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        return (
            <div className="App">
                {list}
                <button onClick={this.send}>送信！</button>
                <div>{this.state.sendCities.map((cityId) => {
                    return (
                        <div>{cityId}</div>
                    )
                })}</div>
            </div>
        );
    }
}

export default CoveredAreaCheckbox;