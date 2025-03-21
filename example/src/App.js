import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Button} from './Button';

import * as ImagePicker from '../../src';

export default function App() {
  const [response, setResponse] = React.useState(null);

  return (
    <SafeAreaView>
      <ScrollView>
        <Button
          title="Take image"
          onPress={() =>
            ImagePicker.launchCamera(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                setResponse(response);
              },
            )
          }
        />

        <Button
          title="Select image"
          onPress={() =>
            ImagePicker.launchImageLibrary(
              {
                allowMultiple: true,
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                setResponse(response);
              },
            )
          }
        />

        <Button
          title="Take video"
          onPress={() =>
            ImagePicker.launchCamera({mediaType: 'video'}, (response) => {
              setResponse(response);
            })
          }
        />

        <Button
          title="Select video"
          onPress={() =>
            ImagePicker.launchImageLibrary({allowMultiple: true, mediaType: 'video'}, (response) => {
              setResponse(response);
            })
          }
        />

        <Button
          title="Select image or video (mixed)"
          onPress={() =>
            ImagePicker.launchImageLibrary(
              {
                allowMultiple: true,
                mediaType: 'mixed',
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                setResponse(response);
              },
            )
          }
        />

        <View style={styles.response}>
          <Text>Res: {JSON.stringify(response)}</Text>
        </View>
        {response && Array.isArray(response.assets) && response.assets.map(asset => (
          <View key={asset.uri} style={styles.image}>
            <Image
              style={{width: 200, height: 200}}
              source={{uri: asset.uri}}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginVertical: 24,
    marginHorizontal: 24,
  },
  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
  response: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
});
