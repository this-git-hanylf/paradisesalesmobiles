import {Text, SafeAreaView, Header, Icon} from '@components';
import {BaseStyle, BaseColor, Fonts} from '../../config';
import {useTranslation} from 'react-i18next';
import {
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import {ScrollView} from 'react-native-gesture-handler';
import Image from '../../components/Image';
import getUser from '../../selectors/UserSelectors';

import {TextInput} from '../../components';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {saveProfile, actionTypes} from '../../actions/UserActions';
import {useSelector, useDispatch, connect} from 'react-redux';
import editSuksesSelector from '../../selectors/EditProfilSelectors';

const EditProfile = props => {
  const {t} = useTranslation();
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const dispatch = useDispatch();
  const {width} = useWindowDimensions().width;
  // const {user} = useSelector(state => getUser)
  const user = useSelector(state => getUser(state));
  console.log('user pict', user);

  const editProfilStatus = useSelector(state => editSuksesSelector(state));
  console.log('edit sttus', editProfilStatus);

  const [email, setEmail] = useState(user.user);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.handphone);

  // useEffect(() => {
  //   if (user === null) {
  //     props.navigation.navigate('Auth');
  //   }
  // });

  const saveProfiles = useCallback(
    () =>
      dispatch(saveProfile({emails: user.user, name, phone, genders: 'Male'})),
    [{emails: user.user, name, phone, genders: 'Male'}, dispatch],
  );

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('edit_profile')}
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
      <ScrollView style={{marginHorizontal: 20}}>
        {user ? (
          user.pict ? (
            <View style={{alignItems: 'center'}}>
              <View style={{width: 100, height: 100}}>
                <Image
                  source={{uri: user.pict}}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}></Image>
              </View>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: BaseColor.corn70,
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={'user'}
                    size={55}
                    solid
                    color={BaseColor.corn50}></Icon>
                  <View style={{position: 'absolute'}}>
                    <Icon
                      name={'camera'}
                      size={23}
                      solid
                      color={BaseColor.whiteColor}></Icon>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <Text>user no</Text>
        )}

        <View
          style={{
            borderBottomColor: BaseColor.grey30,
            borderBottomWidth: 2,
            marginVertical: 30,
          }}></View>

        <View style={{marginTop: 10}}>
          <TextInput
            style={[
              BaseStyle.textInput,
              {marginBottom: 30, backgroundColor: BaseColor.corn30},
            ]}
            onChangeText={text => console.log(text)}
            autoCorrect={false}
            placeholder={t('email')}
            value={email}
            editable={false}
            selectionColor={BaseColor.primary}
          />
          <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={text => setName(text)}
            autoCorrect={false}
            placeholder={t('name')}
            value={name}
            selectionColor={BaseColor.primary}
          />
          <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={text => setPhone(text)}
            autoCorrect={false}
            placeholder={t('phone_number')}
            value={phone}
            selectionColor={BaseColor.primary}
          />
        </View>

        <TouchableOpacity onPress={() => saveProfiles()}>
          <View>
            <Text>Confirm</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text>edit profile</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditProfile;
