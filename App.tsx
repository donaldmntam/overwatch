import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import {
  createSlice,
  configureStore,
  PayloadAction,
  combineSlices,
} from '@reduxjs/toolkit';
import {
  Provider,
  useSelector,
  useDispatch,
  useStore,
  TypedUseSelectorHook,
} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import ListScreen from '~/list/list';

LogBox.ignoreAllLogs();

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

const { increment, decrement, incrementByAmount } = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

type AppStore = typeof store;
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];
type Actions = typeof counterSlice.actions;
const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppStore: () => AppStore = useStore;

const selectCount = (state: RootState) => state.counter.value;

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
  Home: undefined;
  Another: { fucked: string };
  Fuck: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Another'>;

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'huh' }} />
          <Stack.Screen name="Another" component={AnotherScreen} />
          <Stack.Screen name="List" component={ListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

type HomeScreenProps = {};
function HomeScreen(props: NativeStackScreenProps<HomeScreenProps>) {
  const value = useSelector<RootState>(state => state.counter.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(increment());
  }, []);
  return (
    <View style={styles.container}>
      <Text>{`value here! ${value}`}</Text>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => dispatch(increment())}>
        <Text>increment!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(decrement())}>
        <Text>decrement!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(incrementByAmount(10))}>
        <Text>decrement!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.push('Another', {})}>
        <Text>go to another</Text>
      </TouchableOpacity>
    </View>
  );
}

type AnotherScreenProps = {};
function AnotherScreen() {
  return (
    <View style={styles.container}>
      <Text>fukc you</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
