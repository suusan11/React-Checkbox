import React, { Component } from 'react';

// import Moon from './connection/Moon';
//
// const moon = new Moon();

class ProvinceCheckbox extends Component {
    constructor(props){
        super(props);
    }

    render() {
        console.log("🍜" +this.props.provinces);
        return(
            <div>
                {/*<ul>*/}

                {/*{this.props.province.map((prov, index) => {*/}
                {/*return <li key={index} onChange = { () => this.getCities}>*/}
                {/*<input type="checkbox" value={this.props.prov.name} />{prov.province}*/}
                {/*</li>*/}
                {/*})}*/}

                {/*<ul>*/}
                {/*{this.props.cities.map((area, index) => {*/}
                {/*return <li key={index}>*/}
                {/*<input type="checkbox" checked={this.props.isChecked}/>{area.cities}*/}
                {/*</li>*/}
                {/*})}*/}
                {/*</ul>*/}

                {/*</ul>*/}

                {/*{this.props.prov.map((prov, index) =>*/}
                    {/*<div onChange={this.getProv}>*/}
                        {/*<ul key={index}>*/}
                            {/*<li>*/}
                                {/*<input type="checkbox" name="areaList" key={index} id={prov.id} value={prov.name} defaultChecked={this.props.isChecked} />*/}
                                {/*{prov.name}*/}
                                {/*/!*<ul>*!/*/}
                                    {/*/!*<li>*!/*/}
                                        {/*/!*{this.props.areaList.map((city, index) =>*!/*/}
                                            {/*/!*<label>*!/*/}
                                                {/*/!*<input type="checkbox" key={index}  checked={this.props.isChecked}/>*!/*/}
                                                {/*/!*{city}*!/*/}
                                                {/*/!*<br/>*!/*/}
                                            {/*/!*</label>*!/*/}
                                        {/*/!*)}*!/*/}
                                    {/*/!*</li>*!/*/}
                                {/*/!*</ul>*!/*/}
                            {/*</li>*/}
                            {/*<br/>*/}
                        {/*</ul>*/}

                    {/*</div>*/}
                {/*)}*/}
            </div>



        );
    }
}


export default ProvinceCheckbox;