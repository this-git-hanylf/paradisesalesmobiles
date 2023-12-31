import {Text, Button, Icon, Header} from '@components';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  useWindowDimensions,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
const NewsWithoutModal = props => {
  const {navigation} = props;
  const systemFonts = [...defaultSystemFonts, global.fontRegular];
  const {width} = useWindowDimensions().width;
  //   const {onPress, datas, visibleMod, icon, ...attrs} = props;
  //   console.log('attrs ?', attrs);
  //   console.log('datas nya', datas);
  //   console.log('visiblemodal', visibleMod);
  //   const [visibleModal, setVisibleModal] = useState(visibleMod);
  //   console.log('visiblemodaldifeature', visibleModal);
  const {t} = useTranslation();
  const [detailNews, setDetailNews] = useState(props.route.params.datas);
  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const insets = useSafeAreaInsets();

  console.log('detil news', detailNews);
  const close = () => {
    setVisibleModal(false);
  };

  const zoomImage = image => {
    const data = [{url: image}];
    console.log('image zoom', image);
    setShowImage(true);
    setDataImage(data);
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

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        Platform.OS === 'ios' ? {paddingTop: insets.top} : {paddingTop: 10},
      ]}>
      <TouchableOpacity onPress={() => setShowImage(false)}>
        <Icon
          name={'times'}
          color={BaseColor.whiteColor}
          style={{
            fontSize: 16,
          }}></Icon>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('news_detail')}
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
      {detailNews == null ? (
        <View>
          <Text>No Data Promo Detail</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={{marginHorizontal: 30, marginVertical: 20}}>
            <View
            // style={{width: 200, height: 100}}
            >
              <View style={{marginBottom: 25}}>
                <Text
                  style={{
                    color: BaseColor.corn70,
                    fontFamily: Fonts.type.LatoBold,
                    fontSize: 16,
                  }}>
                  {detailNews.news_title}
                </Text>
                <Text
                  style={{
                    color: BaseColor.corn70,
                    fontFamily: Fonts.type.Lato,
                    fontSize: 11,
                    marginVertical: 5,
                  }}>
                  Created date:{' '}
                  {moment(detailNews.date_created).format(
                    'DD MMM YYYY - hh:mm',
                  )}
                </Text>
              </View>
              <TouchableOpacity onPress={() => zoomImage(detailNews.url_image)}>
                <View style={{height: 250, borderRadius: 25, width: '100%'}}>
                  <Image
                    source={{uri: detailNews.url_image}}
                    style={{
                      width: '100%',
                      // height: Dimensions.get('window').height / 2.5,
                      // width: '100%',
                      // // width: 300,
                      height: '100%',
                      // marginTop: 10,
                      // paddingTop: 10,
                      // ...StyleSheet.absoluteFillObject,
                      resizeMode: 'contain',
                      borderRadius: 25,
                    }}></Image>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginVertical: 20}}>
              <RenderHtml
                contentWidth={width}
                source={{html: detailNews.news_descs}}
                systemFonts={systemFonts}
                tagsStyles={{
                  p: {
                    color: BaseColor.corn70,
                    fontSize: 12,
                    fontFamily: Fonts.type.LatoBold,
                    textAlign: 'justify',
                  },
                  li: {
                    // color: isDarkMode ? 'blue' : 'red',
                    color: BaseColor.corn70,
                    fontSize: 12,
                    fontFamily: Fonts.type.LatoBold,
                  },
                }}
              />
              {/* <Text
                style={{
                  textAlign: 'justify',
                  fontFamily: Fonts.type.Lato,
                }}
                numberOfLines={0} // ini wajib ada kalo menggunakan Text dari component
              >
                {detailNews.news_descs
                  .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                  .replace(/(&nbsp;)/g, ' ')
                  .replace(/(&ndash;)/g, '-')
                  .replace(/(&amp;)/g, `&`)}
              </Text> */}
            </View>
          </View>
        </ScrollView>
      )}
      <Modal visible={showImage} transparent={true}>
        {renderHeader()}
        <ImageViewer
          useNativeDriver={true}
          imageUrls={dataImage}
          enableSwipeDown={true}
          onSwipeDown={() => setShowImage(false)}
          onSave={uri => _saveImages(uri)}
          menuContext={{
            saveToLocal: 'Save Image',
            cancel: 'Cancel',
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default NewsWithoutModal;
