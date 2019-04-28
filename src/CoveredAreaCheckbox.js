import React, { Component } from 'react';

import Moon from './connection/Moon';
const moon = new Moon();


class CoveredAreaCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinces: [],
            cities: [],
            dataIsSet: false,
            checkedCities: [],
            sendCities: [],
        };
    }

    componentDidMount() {
        const showProvArea = [];
        const showCitiesArea = [];
        const checkedCities = [];
        let id = '';

        let promise1 = moon
            .get('api/area/all')
            .then((res) => {

                //get prov data
                for (let i = 0; i < res.data.length; i++) {

                    showProvArea.push({
                        id: res.data[i]._id,
                        name: res.data[i].name
                    });

                    id = res.data[i]._id;
                    checkedCities[`city${id}`] = new Set();
                }
                this.setState({provinces: showProvArea}, () => {
                    console.info("🐷" + JSON.stringify(this.state.provinces));
                });
            })
            .catch((err) => {
                // this.disabledInput();
                console.error(err);

                throw err;
            });

        let promise2 = moon
            .get('api/area/cities/all')
            .then((res) => {
                //get city data
                for(let i = 0; i < res.data.length; i++) {

                    showCitiesArea.push({
                        city: res.data[i].city,
                        cityId: res.data[i]._id,
                        provId: res.data[i].area_id._id,
                        prov: res.data[i].area_id.name
                    });
                }

                this.setState({cities: showCitiesArea}, () => {
                    console.info("🐷" + JSON.stringify(this.state.cities));
                });

                showCitiesArea[`city${id}`] = showCitiesArea[id];
            })
            .catch((err) => {
                // this.disabledInput();
                console.error(err);

                throw err;
            });

        // const promise1 = moon.get('api/area/all')
        //     .then((res, resolve) => {
        //
        //         //get prov data
        //         for (let i = 0; i < res.data.length; i++) {
        //
        //             showProvArea.push({
        //                 id: res.data[i]._id,
        //                 name: res.data[i].name
        //             });
        //
        //             const id = res.data[i]._id;
        //             checkedCities[`city${id}`] = new Set();
        //         }
        //
        //         this.setState({ provinces: showProvArea, checkedCities: checkedCities, }, () => {
        //             console.log("🐷" + JSON.stringify(this.state.provinces));
        //         });
        //
        //         return resolve();
        //     })
        //
        //     .catch((err, reject) => {
        //         // this.disabledInput();
        //         console.log(JSON.stringify(err));
        //
        //         return reject;
        //     });
        //
        // const promise2 = moon.get('api/area/cities/all')
        //     .then((res, resolve) => {
        //
        //         //get city data
        //         for(let i = 0; i < res.data.length; i++) {
        //
        //             showCitiesArea.push({
        //                 city: res.data[i].city,
        //                 cityId: res.data[i]._id,
        //                 provId: res.data[i].area_id._id,
        //                 prov: res.data[i].area_id.name
        //             });
        //         }
        //
        //         this.setState({ cities: showCitiesArea, }, () => {
        //             console.log("🐷" + JSON.stringify(this.state.cities));
        //         });
        //
        //         return resolve();
        //     })
        //
        //     .catch((err, reject) => {
        //         // this.disabledInput();
        //         console.log(JSON.stringify(err));
        //
        //         return reject;
        //     });

        Promise.all([promise1, promise2])
            .then(() => {
                this.setState({ dataIsSet: true})
            });
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

    // handleAllChange = (event) => {
    //     const { name, checked } = event.target;
    //     const { cities, checkedCities } = this.state;
    //
    //     if (checked) {
    //         for (const city of cities[`city${name}`]) {
    //             checkedCities[`city${name}`].add(city._id);
    //         }
    //     } else {
    //         checkedCities[`city${name}`].clear();
    //     }
    //     this.setState({ checkedCities: checkedCities });
    // };
    //
    // send = () => {
    //     const { checkedCities } = this.state;
    //     let arr = [];
    //     Object.keys(checkedCities).forEach((provId) => {
    //         arr = arr.concat(Array.from(checkedCities[provId]));
    //     });
    //     this.setState({ sendCities: arr });
    // };


    render() {
        const { provinces, cities, dataIsSet, checkedCities } = this.state;

        console.info("is data set? :", dataIsSet);
        console.info("provinces: ", provinces);
        console.info("cities: ", cities);

        const list = dataIsSet ?
            provinces.map((areaValue, areaIndex, areaArray) => {
                console.info(areaValue);

                // the reason of possible error
                console.info("city: ", cities[`city${areaValue.id}`]);  // => undefined

                return (
                      <div key={areaIndex}>
                        <h1>{areaValue.name}</h1>
                        <div>
                            <div>
                                <input
                                    name={areaValue._id}
                                    type="checkbox"
                                    // checked={checkedCities[`city${prov.provId}`].size >= cities[`city${prov.provId}`].length}
                                    // onChange={this.handleAllChange}
                                />
                                <label>all</label>
                            </div>
                            {
                                cities[`city${areaValue.id}`].map((cityValue,cityIndex,cityArray) => {
                                    if(cityValue.prov === areaValue.name) {
                                        return (
                                            <div key={cityIndex}>
                                                <input
                                                    name={cityValue.cityId}
                                                    type="checkbox"
                                                    checked={checkedCities[`city${areaValue.id}`].has(cityValue.cityId)}
                                                    onChange={this.handleChange(areaValue.id)}
                                                />
                                                <label>{cityValue.city}</label>
                                            </div>
                                        )
                                    }

                                })
                            }
                        </div>
                    </div>
                )
            })
            :
            <div>Spinner</div>

        return (
            <div>
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