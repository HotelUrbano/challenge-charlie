import React, { Component } from 'react';
import { func, instanceOf, string } from 'prop-types';
import {
  Box,
  Icon,
  Temperature,
  Text,
} from 'components/atoms';
import {
  DataBox,
  DataLocationBox,
  IconBox,
  Wrapper,
} from './style';


class MainWeather extends Component {
  static propTypes = {
    mainColor: string.isRequired,
    onChangeTemperature: func,
    secoundColor: string,
    selectedTemperature: string,
    weather: instanceOf(Object),
  };

  static defaultProps = {
    onChangeTemperature: null,
    secoundColor: null,
    selectedTemperature: 'C',
    weather: {},
  };

  handleChangeTemperature = () => {
    const { onChangeTemperature } = this.props;
    if (!onChangeTemperature) return;
    onChangeTemperature();
  };

  render() {
    const {
      mainColor,
      secoundColor,
      selectedTemperature,
      weather,
    } = this.props;
    const { location, today } = weather;
    const currentTemperature = today.temperature[selectedTemperature];
    return (
      <Box mainColor={mainColor} secoundColor={secoundColor} height={22}>
        <Wrapper>
          <IconBox>
            <Icon code={today.image} type="large" />
          </IconBox>
          <DataBox>
            <DataLocationBox>
              <Temperature onClick={this.handleChangeTemperature} type={selectedTemperature}>
                {currentTemperature}
              </Temperature>
              <Text type="small">{ `${location.city} / ${location.region}` }</Text>
              <Text type="small">Hoje</Text>
            </DataLocationBox>
            <DataLocationBox>
              <Text type="medium">{today.title}</Text>
              <Text type="small">Vento: 32.3km/h</Text>
              <Text type="small">Pressão: 0.3atm</Text>
              <Text type="small">Umidade: 24%</Text>
            </DataLocationBox>
          </DataBox>
        </Wrapper>
      </Box>
    );
  }
}


export default MainWeather;
