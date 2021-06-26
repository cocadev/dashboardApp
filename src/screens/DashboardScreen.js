import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Api from '../Api';
import AppStyles from '../AppStyles';
import CategoryButton from '../components/CategoryButton';

class DashboardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Dashboard',
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Icon
          style={AppStyles.styleSet.menuButton}
          name="ios-menu"
          size={AppStyles.iconSizeSet.normal}
          color={AppStyles.colorSet.mainThemeForegroundColor}
        />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      categories: Api.getCategories(),
    };
  }

  onPressCategory = item => {
    if (item.title === 'Analytics') {
      this.props.navigation.navigate('AnalyticsScreen');
    } else {
      this.props.navigation.navigate('ListScreen', { category: item.title });
    }
  };

  render() {
    const categoryButtonsRow1 = this.state.categories.map((item, index) => {
      if (index < 3) {
        return (
          <CategoryButton
            onPress={() => this.onPressCategory(item)}
            color={item.color}
            lightColor={item.lightColor}
            icon={item.icon}
            title={item.title}
          />
        );
      }
    });
    const categoryButtonsRow2 = this.state.categories.map((item, index) => {
      if (index >= 3) {
        return (
          <CategoryButton
            onPress={() => this.onPressCategory(item)}
            color={item.color}
            lightColor={item.lightColor}
            icon={item.icon}
            title={item.title}
          />
        );
      }
    });

    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>{categoryButtonsRow1}</View>
        <View style={styles.row}>{categoryButtonsRow2}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
});

DashboardScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(mapStateToProps)(DashboardScreen);
