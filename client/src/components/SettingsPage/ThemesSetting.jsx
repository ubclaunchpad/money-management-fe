import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../../theme';
import StyledButton from '../StyledButton';

const ThemesSetting = ({ state, setState }) => {
  const colorData = ['#24838F', '#996A25', '#17C308', '#0032E5', '#BF0000', '#742599'];

  return (
    <>
      <Modal
        isVisible={state.isThemesModalOpen}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropTransitionInTiming={0}
        backdropColor={theme.colors.white}
        backdropOpacity={1}
        onRequestClose={() => {
          setState({ isThemesModalOpen: false });
        }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <StyledButton
              customStyles={styles}
              onTap={() => {
                setState({ isThemesModalOpen: false });
              }}
              iconName="chevron-with-circle-left"
              iconSize={36}
              iconColor={theme.colors.primary}
            />
            <Text style={styles.titleText}>Themes</Text>
          </View>
          <View style={styles.themesSelections}>
            {colorData.map((item) => {
              return (
                <>
                  <Pressable>
                    <LinearGradient
                      colors={[item, '#F3F3F3']}
                      style={[styles.circle, { borderColor: item }]}
                      key={item}
                    />
                  </Pressable>
                </>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  pressable: {
    position: 'absolute',
    left: 0,
    top: -10,
  },
  titleText: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 4,
    color: theme.colors.primary,
  },
  themesSelections: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  circle: {
    width: Dimensions.get('screen').width / 4,
    height: Dimensions.get('screen').width / 4,
    borderRadius: Dimensions.get('screen').width / 8,
    borderWidth: 3,
    margin: 10,
  },
});

export default ThemesSetting;
