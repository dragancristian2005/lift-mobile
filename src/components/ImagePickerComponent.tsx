import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useUserInfo } from '../hooks/api/useUserInfo';

const ImagePickerComponent = () => {
  const updateProfilePicture = async (image: any) => {
    try {
      const fileUri: string = image.uri;

      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      } as any);
      await axios.post('/auth/profile-picture', formData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      await updateProfilePicture(result.assets[0]);
    }
  };

  const { data } = useUserInfo();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imgBtn}>
        <Image
          source={{
            uri: data?.avatar?.filePath
              ? `http://192.168.1.4:3000/${data.avatar.filePath}`
              : 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg',
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 25,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imgBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default ImagePickerComponent;
