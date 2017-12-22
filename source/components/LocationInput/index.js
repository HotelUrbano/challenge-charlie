import style from './style.css';
import React from 'react';

import Autocomplete from 'react-autocomplete';

const menuStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
    cursor: 'pointer',
    position: 'fixed',
};

class LocationInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Localização atual',
        };
    }

    selectLocationName(locationName) {
        this.props.fetchLocationWeatherByName(locationName);
        this.setState({ value: locationName });
    }

    render() {
        return (
            <div className={style.autocomplete}>
                <Autocomplete
                    menuStyle={menuStyle}
                    items={this.props.items}
                    shouldItemRender={
                        (item, value) => item.label
                            .toLowerCase().indexOf(value.toLowerCase()) > -1
                    }
                    getItemValue={(item) => item.label}
                    renderItem={(item, highlighted) =>
                        <div
                        key={item.id}
                        style={{
                        backgroundColor: highlighted ? '#eee' : 'transparent',
                        }}>
                            {item.label}
                        </div>
                    }
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                    onSelect={this.selectLocationName.bind(this)}
                    />
            </div>
        );
    }
}

export default LocationInput;
