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
        let showCitiesArea = [];
        const checkedCities = [];

        const promise1 = moon
            .get('api/area/all')
            .then((res) => {

                //get prov data
                for (let i = 0; i < res.data.length; i++) {

                    showProvArea.push({
                        id: res.data[i]._id,
                        name: res.data[i].name
                    });

                    checkedCities[i] = new Set();
                }

                this.setState({provinces: showProvArea, checkedCities: checkedCities, }, () => {
                    console.info("🐷" + JSON.stringify(this.state.provinces));
                });
            })
            .catch((err) => {
                // this.disabledInput();
                console.error(err);

                throw err;
            });

        const promise2 = moon
            .get('api/area/cities/all')
            .then((res) => {
                const NT = [];
                const YT = [];
                const NU = [];
                const ON = [];
                const QC = [];
                const BC = [];
                const MB = [];
                const NB = [];
                const PE = [];
                const NS = [];
                const NF = [];
                const SK = [];
                const AB = [];

                //get city data
                for(let i = 0; i < res.data.length; i++) {
                    let obj = {};
                        obj['city'] = res.data[i].city;
                        obj['cityId'] = res.data[i]._id;
                        obj['provId'] = res.data[i].area_id._id;
                        obj['prov'] = res.data[i].area_id.name;
                        if(obj['provId'] === '5c9293ff71ab0b07e8c61c38') {
                            NT.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c39') {
                            YT.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c3a') {
                            NU.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c3b') {
                            ON.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c3d') {
                            QC.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c3c') {
                            BC.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c40') {
                            MB.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c3f') {
                            NB.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c41') {
                            PE.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c3e') {
                            NS.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c44') {
                            NF.push(obj)
                        }else if(obj['provId'] === '5c9293ff71ab0b07e8c61c42') {
                            SK.push(obj)
                        }else {
                            AB.push(obj)
                        }
                    showCitiesArea = [NT, YT, NU, ON, QC, BC, MB, NB, PE, NS, NF, SK, AB];
                }

                this.setState({cities: showCitiesArea}, () => {
                    console.info("🐷" + JSON.stringify(this.state.cities));
                });
            })
            .catch((err) => {
                // this.disabledInput();
                console.error(err);

                throw err;
            });


        Promise.all([promise1, promise2])
            .then(() => {
                this.setState({ dataIsSet: true})
            });
    }


    handleChange = (provIndex) => (event) => {

        const { name } = event.target;
        const { checkedCities } = this.state;

        if (checkedCities[provIndex].has(name)) {
            checkedCities[provIndex].delete(name);
        } else {
            checkedCities[provIndex].add(name);
        }
        this.setState({ checkedCities: checkedCities}
        );
        console.log(checkedCities[provIndex]);
    };

    handleAllChange = (event) => {
        const { name, checked } = event.target;
        const provIndex = Number(name);//convert to number
        const { cities, checkedCities } = this.state;

        if (checked) {
            for (const city of cities[provIndex]) {
                checkedCities[provIndex].add(city.cityId);
            }
        } else {
            checkedCities[provIndex].clear();
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
        const { provinces, cities, dataIsSet, checkedCities } = this.state;

        console.info("is data set? :", dataIsSet);
        console.info("provinces: ", provinces);
        console.info("cities: ", cities);

        const list = dataIsSet ?
            provinces.map((areaValue, areaIndex) => {
                console.info(areaValue);

                // console.info("city: ", cities[areaIndex]);
                // console.log("🥕" + JSON.stringify(cities[areaIndex]));
                // console.log("🥕" + checkedCities[areaValue.id]);

                return (
                      <div key={areaIndex}>
                        <h1>{areaValue.name}</h1>
                        <div>
                            <div>
                                <input
                                    name={areaIndex}
                                    type="checkbox"
                                    checked={checkedCities[areaIndex].size >= cities[areaIndex].length}
                                    onChange={this.handleAllChange}
                                />
                                <label>all</label>
                            </div>

                            {
                                cities[areaIndex].map((cityValue,cityIndex) => {
                                    // console.log("🦄" + JSON.stringify(cityValue));
                                    // console.log("🍉" + cityValue.prov); // => it'll show prov name
                                    // console.log("🥞" + areaValue.name); // => it'll show prov name
                                     {
                                        return (
                                            <div key={cityIndex}>
                                                <input
                                                    name={cityValue.cityId}
                                                    type="checkbox"
                                                    checked={checkedCities[areaIndex].has(cityValue.cityId)}
                                                    onChange={this.handleChange(areaIndex)}//belonging province
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
            <div>Spinner</div>;

        return (
            <div>
                {list}
                <button onClick={this.send}>Send！</button>
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