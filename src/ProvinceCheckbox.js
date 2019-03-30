import React, { Component } from 'react';

// import Moon from './connection/Moon';
//
// const moon = new Moon();

class ProvinceCheckbox extends Component {
    constructor(props){
        super(props);
    }

    render() {
        console.log("🍜" +this.props.province);
        return(
            <ul>
                {/*{this.props.provinces.map((prov, index) => {*/}
                    {/*return <li key={index} onChange = { () => this.getCities}>*/}
                            {/*<input type="checkbox" value={this.props.prov.name} />{prov.province}*/}
                           {/*</li>*/}
                {/*})}*/}

                {/*<ul>*/}
                    {/*{this.props.areaList.map((area, index) => {*/}
                        {/*return <li key={index}>*/}
                                {/*<input type="checkbox" checked={this.props.isChecked}/>{area.cities}*/}
                               {/*</li>*/}
                    {/*})}*/}
                {/*</ul>*/}

            </ul>
        );
    }
}


export default ProvinceCheckbox;