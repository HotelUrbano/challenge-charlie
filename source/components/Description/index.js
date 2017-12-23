import style from './style.css';
import React from 'react';

import DescriptionIcon from '../DescriptionIcon';
import DescriptionText from '../DescriptionText';

class Description extends React.Component {
    render() {
        if (this.props.loading) {
            return <div className={style.descriptionLoading}></div>;
        }
        return (
            <div
                className={style.description}
                style={{
                    backgroundColor: this.props.color,
                }}>
                <DescriptionIcon
                    weatherType={this.props.weatherType}/>
                <DescriptionText
                    className={style.descriptionText}
                    day={this.props.day}
                    temperature={this.props.temperature}
                    changeTemperatureUnit={this.props.changeTemperatureUnit}
                    weatherTypeName={this.props.weatherTypeName}
                    wind={this.props.wind}
                    humidity={this.props.humidity}
                    pressure={this.props.pressure}/>
            </div>
        );
    }
}

export default Description;
