import {Text, SafeAreaView, Header, Icon} from '@components';
import {BaseStyle, BaseColor, Fonts} from '../../config';
import {useTranslation} from 'react-i18next';
import {View, TouchableOpacity, FlatList} from 'react-native';
import dummy_menu_hc from './data_menu_hc.json';
const HelpCenter = props => {
  const {t} = useTranslation();
  const dummy_menu = dummy_menu_hc.menu_helpcenter;
  const {navigation} = props;
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('help_center')}
        renderLeft={() => {
          return (
            <Icon
              // name="angle-left"
              name="arrow-left"
              size={18}
              color={BaseColor.corn70}
              enableRTL={true}
            />
          );
        }}
        style={{height: 80}}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <View style={{marginTop: 40}}>
        <FlatList
          data={dummy_menu}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                disabled={true}
                // onPress={() => alert(item.component)}
              >
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginVertical: 15,
                    marginHorizontal: 20,
                    height: 55,

                    borderBottomWidth: 1,
                    borderBottomColor: BaseColor.corn30,

                    borderTopWidth: index == 0 ? 1 : 0,
                    borderTopColor: BaseColor.corn30,
                  }}>
                  <View
                    style={{
                      // backgroundColor: 'yellow',
                      flexDirection: 'row',
                      // marginHorizontal: 20,
                      alignSelf: 'center',
                    }}>
                    <Icon
                      name={item.icon_menu}
                      size={24}
                      color={BaseColor.corn70}
                      style={{alignSelf: 'center'}}></Icon>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontFamily: Fonts.type.Lato,
                        fontSize: 16,
                        paddingVertical: 3,
                        paddingHorizontal: 15,
                        color: BaseColor.corn70,
                      }}>
                      {item.nama_menu}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      // marginHorizontal: 20,
                      alignSelf: 'center',
                    }}>
                    <Icon
                      name={'chevron-right'}
                      size={14}
                      color={BaseColor.corn50}></Icon>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}></FlatList>
      </View>
    </SafeAreaView>
  );
};
export default HelpCenter;
