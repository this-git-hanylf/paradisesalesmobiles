import {Text, Header, Icon, Button} from '@components';

import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Animated,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import styles from './styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';
import UnitInfoModal from './Modal/UnitInfoModal';

import ReactNativeBlobUtil from 'react-native-blob-util';
import UnitInfoDetailsModal from './Modal/UnitInfoDetailsModal';

import ImageViewing from 'react-native-image-viewing';
import get from 'lodash/get';

const UnitInfo = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));
  const [showPromo, setShowPromo] = useState(false);
  const [modalVisibile, setModalVisible] = useState(false);
  const [paramsData, setParamsData] = useState(props.route.params.paramsData);
  const [itemsData, setItemsData] = useState(props.route.params.item);
  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  let [toggled, setToggled] = useState(false);
  const height = useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();

  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setImageIndex] = useState(0);

  console.log('params data untuk unit info', paramsData);
  console.log('items data untuk unit info', itemsData);

  const dataPromo = [
    {title: 'tes', descs: 'ini decs', date: '27 agustus 2023'},
  ];

  const zoomImage = image => {
    console.log('array image zoom', image);
    setImageIndex(0);
    const data = [{uri: image}];

    console.log('arr url', data);

    setDataImage(data);
    setIsVisible(true);
  };

  const onRequestClose = () => setIsVisible(false);

  const onLongPress = image => {
    // Alert.alert('url image', image.uri);
    Alert.alert(
      'Do you want to save the image?',
      'This image will be saved on your phone.',
      [
        {text: 'Yes', onPress: () => _saveImages(image.uri)},
        {text: 'Cancel', onPress: () => onRequestClose()},
      ],
      {cancelable: false},
    );
  };

  const _saveImages = uri => {
    console.log('urii??', uri);
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        path: dirs.DownloadDir + '/' + 'Promo',
        // path: dirs.DownloadDir + '/' + item.doc_no + '.' + extension, //ini pake extensi yang sama kayak url
        useDownloadManager: true,
        // Show notification when response data transmitted
        notification: true,
        // Title of download notification
        title: 'Image News Apps Paradise Mobiles',
        // File description (not notification description)
        description: 'downloading content...',
        // mime: 'application/pdf',
        // Make the file scannable  by media scanner
        mediaScannable: true,
      },
    })
      .fetch('GET', uri, {
        //some headers ..
      })
      .then(res => {
        // the temp file path
        console.log('The file saved to ', res.path());
        imageView = (
          <Image
            source={{
              uri:
                Platform.OS === 'android'
                  ? 'file://' + res.path()
                  : '' + res.path(),
            }}
          />
        );
      });
  };

  // useEffect(() => {}, [toggled]);

  const toggledShowMore = () => {
    Animated.timing(height, {
      toValue: toggled ? 2 : 0,
      duration: 600,
    }).start();

    setToggled(toggled => !toggled);
  };

  const dataDummyDetails =
    'Lokasi terbaik, berada di Jantung Jakarta Selatan, di Perempatan Pangeran Antasari dan TB Simatupang. Akses mudah, dengan Akses JORR 1 dan 2, sehingga mudah menuju ke berbagai area sekitar lainnya. Semua yang kamu butuhkan tersedia, Fitness Center, kolam renang, serta fasilitas untuk anak-anak seperti sekolah, area playground dalam satu area tempat tinggal. Konsultasi kelas dunia, dalam merancang dan merencanakan produknya INPP berorientasi pada pendekatan yang berfokus pada konsumen. yang dihasilkan harus sesuai kebutuhan, Kebiasaan, dan kapabilitas konsumen. Tipe unit smart dan modern, selalu konsisten dalam mengimplementasikan startegi bisnis yang kreatif dan inovatifuntuk menghasilkan Iconic Lifestyle Destination.';

  const ImageHeader = ({title, onRequestClose}) => {
    const HIT_SLOP = {top: 16, left: 16, bottom: 16, right: 16};
    return (
      <SafeAreaView style={{backgroundColor: '#00000077'}}>
        <View
          style={{
            flex: 1,
            padding: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: 45, height: 45}} />
          {title && (
            <Text
              style={{
                maxWidth: 240,
                marginTop: 12,
                flex: 1,
                flexWrap: 'wrap',
                textAlign: 'center',
                fontSize: 17,
                lineHeight: 17,
                color: '#FFF',
              }}>
              {title}
            </Text>
          )}
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onRequestClose}
            hitSlop={HIT_SLOP}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('unit_info')}
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
      <ScrollView
        style={{
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            justifyContent: 'space-around',
            // width: '100%',
            marginHorizontal: 5,
          }}>
          <TouchableOpacity onPress={() => zoomImage(paramsData.picture_url)}>
            <View style={{marginVertical: 10, marginHorizontal: 10}}>
              <Image
                // source={require('@assets/images/promonews/promo2.png')}
                source={{uri: paramsData.picture_url}}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: 'cover',
                  borderRadius: 15,
                }}></Image>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '50%',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.type.LatoBold,
                color: BaseColor.corn70,
              }}>
              {paramsData.property_cd}
            </Text>

            <Text
              numberOfLines={4}
              style={{
                marginTop: 5,
                fontSize: 16,
                fontFamily: Fonts.type.Lato,
                color: BaseColor.corn70,
              }}>
              Unit {itemsData.lot_no}
            </Text>
            <View
              style={{
                marginVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  style={{marginRight: 5}}
                  name={'bed'}
                  size={12}
                  color={BaseColor.corn70}></Icon>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn70,
                  }}>
                  {paramsData.qty_bedroom} Bedroom
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  style={{marginRight: 5}}
                  name={'shower'}
                  size={12}
                  color={BaseColor.corn70}></Icon>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn70,
                  }}>
                  {paramsData.qty_bathroom} Bathroom
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                {itemsData.build_up_area} SQM Nett / {itemsData.land_area} SQM
                Semi gross
              </Text>
            </View>

            {/* ----- di comment dulu karena data nya masih bingung ngambil yg mana  */}
            {/* <Button
              onPress={() => setShowPromo(true)}
              style={{
                backgroundColor: BaseColor.corn50,
                height: 40,
                marginTop: 15,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: BaseColor.whiteColor,
                  fontSize: 12,
                  fontFamily: Fonts.type.Lato,
                }}>
                See gallery
              </Text>
            </Button> */}
          </View>
        </View>

        {/* --- border  */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: BaseColor.corn30,
            marginVertical: 20,
          }}></View>

        <View>
          <Text
            style={{
              fontFamily: Fonts.type.LatoBold,
              color: BaseColor.corn70,
              fontSize: 14,
              //   marginVertical: 10,
              marginTop: 5,
              marginBottom: 15,
            }}>
            {t('unit_details')}
          </Text>
          {/* <Animated.View
            style={{
              // backgroundColor: 'blue',
              height: height.interpolate({
                inputRange: [0, 1],
                outputRange: [70, 200],
              }),
            }}>
            {console.log('togle', toggled)} */}
          <Text
            numberOfLines={4}
            style={{
              fontFamily: Fonts.type.Lato,
              color: BaseColor.corn70,
              fontSize: 14,
              textAlign: 'justify',
            }}>
            {dataDummyDetails}
          </Text>
          {/* </Animated.View> */}

          {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
           */}
          <TouchableOpacity onPress={() => setModalVisible()}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn90,
                  marginBottom: 2,
                  marginRight: 5,
                  alignSelf: 'center',
                  // alignContent: 'center',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: BaseColor.corn90,
                }}>
                Show more
              </Text>
              <Icon
                name="chevron-right"
                size={14}
                color={BaseColor.corn70}
                enableRTL={true}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* --- border  */}
        <View
          style={{
            borderWidth: 0.3,
            borderColor: BaseColor.corn30,
            borderStyle: 'solid',
            marginVertical: 20,
          }}></View>

        <View>
          <Text
            style={{
              fontFamily: Fonts.type.LatoBold,
              color: BaseColor.corn70,
              fontSize: 14,
              //   marginVertical: 10,
              marginTop: 5,
              marginBottom: 15,
            }}>
            Room facility
          </Text>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 10}}
                name={'bed'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                {paramsData.qty_bedroom} Bedroom
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'shower'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                {paramsData.qty_bathroom} Bathroom
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'archive'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                Kitchen table top & lower cabinet
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'fire-alt'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                Stove
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'fax'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                Telephone & Internet outlet
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'pager'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                Air Conditioner
              </Text>
            </View>
          </View>
        </View>

        {/* --- border  */}
        <View
          style={{
            borderWidth: 0.3,
            borderColor: BaseColor.corn30,
            borderStyle: 'solid',
            marginVertical: 20,
          }}></View>

        {/* <View>
          <Text
            style={{
              fontFamily: Fonts.type.LatoBold,
              color: BaseColor.corn70,
              fontSize: 14,
              //   marginVertical: 10,
              marginTop: 5,
              marginBottom: 15,
            }}>
            Unit Plan
          </Text>
          <TouchableOpacity
            onPress={() =>
              zoomImage(require('@assets/images/floorplan/STD-1.jpg'))
            }>
          <Image
            style={{
              alignSelf: 'center',
              resizeMode: 'contain',
              width: '100%',
              height: 200,
            }}
            source={require('@assets/images/floorplan/STD-1.jpg')}></Image>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
      <ImageViewing
        images={dataImage}
        imageIndex={currentImageIndex}
        presentationStyle="overFullScreen"
        visible={isVisible}
        onRequestClose={onRequestClose}
        onLongPress={onLongPress}
        HeaderComponent={
          dataImage === paramsData
            ? ({imageIndex}) => {
                const title = get(dataImage, `${imageIndex}.title`);
                return (
                  <ImageHeader title={title} onRequestClose={onRequestClose} />
                );
              }
            : undefined
        }
        FooterComponent={({imageIndex}) => (
          <View
            style={{
              flex: 1,
              backgroundColor: '#000',
              ...Platform.select({
                android: {
                  paddingTop: StatusBar.currentHeight,
                  marginLeft: 40,
                  bottom: 40,
                },
                ios: {marginLeft: 40, bottom: 40},
              }),
            }}>
            <Text
              style={{
                fontFamily: Fonts.type.Lato,
                color: BaseColor.corn30,
              }}>{`${imageIndex + 1} / ${dataImage.length}`}</Text>
          </View>
          // <ImageFooter
          //   imageIndex={imageIndex}
          //   imagesCount={dataImage.length}
          // />
        )}
      />

      <UnitInfoModal
        onRequestClose={() => {
          setShowPromo(false);
        }}
        visible={showPromo}
        icon={
          <TouchableOpacity onPress={() => setShowPromo(false)}>
            <Icon name={'arrow-left'} size={18} color={BaseColor.corn90}></Icon>
          </TouchableOpacity>
        }
        datas={dataPromo}></UnitInfoModal>
      <UnitInfoDetailsModal
        onRequestClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisibile}
        icon={
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Icon name={'arrow-left'} size={18} color={BaseColor.corn90}></Icon>
          </TouchableOpacity>
        }
        datas={dataDummyDetails}></UnitInfoDetailsModal>
    </SafeAreaView>
  );
};

export default UnitInfo;
