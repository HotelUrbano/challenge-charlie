import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as temperatureUnitActions from '../../actions/temperatureUnitActions';
import Description from '../../components/Description';

class DescriptionContainer extends React.Component {
    getTemperature() {
        const temperatureFarenheit = this.props.weather.temperature;
        if (this.props.temperatureUnit === 'celsius') {
            const exactTemperature = (temperatureFarenheit - 32) * 5/9;
            const temperature = Math.round(exactTemperature * 10) / 10;
            return `${temperature}ºC`;
        }
        return `${temperatureFarenheit}ºF`;
    }

    convertDegreesToCardinals(degrees) {
        const directions = [
            { from: 348.75, to: 360, name: 'N' },
            { from: 0, to: 11.25, name: 'N' },
            { from: 11.25, to: 33.75, name: 'NNE' },
            { from: 33.75, to: 56.25, name: 'NE' },
            { from: 56.25, to: 78.75, name: 'ENE' },
            { from: 78.75, to: 101.25, name: 'E' },
            { from: 101.25, to: 123.75, name: 'ESE' },
            { from: 123.75, to: 146.25, name: 'SE' },
            { from: 146.25, to: 168.75, name: 'SSE' },
            { from: 168.75, to: 191.25, name: 'S' },
            { from: 191.25, to: 213.75, name: 'SSW'},
            { from: 213.75, to: 236.25, name: 'SW'},
            { from: 236.25, to: 258.75, name: 'WSW'},
            { from: 258.75, to: 281.25, name: 'W'},
            { from: 281.25, to: 303.75, name: 'WNW'},
            { from: 303.75, to: 326.25, name: 'NW'},
            { from: 326.25, to: 348.75, name: 'NNW'},
        ];

        return directions.reduce((prev, cur) => {
            if (degrees >= cur.from && degrees < cur.to) {
                return cur.name;
            }
            return prev;
        }, 'N');
    }

    getWind() {
        const speedMph =
            R.path(['wind', 'speed'], this.props.weather);
        const directionDegrees =
            R.path(['wind', 'direction'], this.props.weather);

        const speed = Math.round(speedMph * 1.60934);
        const direction = this.convertDegreesToCardinals(directionDegrees);
        return `${direction} ${speed}km/h`;
    }

    getHumidity() {
        const humidity =
            R.path(['atmosphere', 'humidity'], this.props.weather);
        return `${humidity}%`;
    }

    getPressure() {
        const pressure =
            R.path(['atmosphere', 'pressure'], this.props.weather);
        return `${pressure}hPA`;
    }

    getWeatherTypeInfo() {
        switch (this.props.weather.weatherType) {
            case 'Mostly Cloudy':
                return { icon: '2', name: 'Nublado' };
            case 'Cloudly':
                return { icon: '4', name: 'Nublado' };
            case 'Rain':
                return { icon: '3', name: 'Chuvoso' };
            default:
                return { icon: '2', name: 'Ensolarado' };
        }
    }

    getBackbackgroundColor() {
        const temperature = (this.props.weather.temperature - 32) * 5/9;
        if (temperature > 35) {
            return this.formatRGBA(255, 100, 100);
        }
        if (temperature < 15) {
            return this.formatRGBA(100, 100, 255);
        }
        return this.formatRGBA(150, 150, 150);
    }

    formatRGBA(r, g, b, a = 0.7) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    render() {
        if (this.props.weather.locationName) {
            return (
                <Description
                    icon={this.getWeatherTypeInfo().icon}
                    day="Hoje"
                    color={this.getBackbackgroundColor()}
                    temperature={this.getTemperature()}
                    changeTemperatureUnit={
                        this.props.actions.changeTemperatureUnit}
                    weatherType={this.getWeatherTypeInfo().name}
                    wind={this.getWind()}
                    humidity={this.getHumidity()}
                    pressure={this.getPressure()}
                />
            );
        }
        return <Description loading="true"/>;
    }
}

const mapStateToProps = (state, ownProps) =>
    ({ weather: state.weather, temperatureUnit: state.temperatureUnit });

const mapDispatchToProps = (dispatch) =>
    ({ actions: bindActionCreators(temperatureUnitActions, dispatch) });

export default connect(
    mapStateToProps, mapDispatchToProps)(DescriptionContainer);
