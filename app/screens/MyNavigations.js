import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Pantalla About
import AboutScreen from './about/AboutScreen';

// Pantalla Battler
import BattlerScreen from "./battler/BattlerScreen";
import TypeSearch from "./battler/TypeSearch";
import TypeTable from "./battler/TypeTable";

// Pantalla de Búsqueda
import SearchScreen from "./search/SearchScreens";
import PokeInfo from './search/PokeInfo';

// Pantalla Team
import TeamScreen from "./team/TeamScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function MyNavigations() {
  return (
    <Tab.Navigator>
        <Tab.Screen
          name='Team' component={TeamScreen}
          options={{
            unmountOnBlur: true,
            headerTitleAlign:"center",
            tabBarIcon:({color, size})=>
              <MaterialCommunityIcons name="pokeball" size={size} color={color}/>}}
          />
        <Tab.Screen
          name='Buscador' component={SearchStack}
          options={{
            headerTitleAlign:"center",
            headerShown:false,
            tabBarIcon:({color, size})=>
              <MaterialCommunityIcons name="magnify" size={size} color={color}/>}}
          />
        <Tab.Screen
          name='Battler' component={BattleStack}
          options={{
            headerTitleAlign:"center",
            headerShown: false,
            tabBarIcon:({color, size})=>
              <MaterialCommunityIcons name="boxing-glove" size={size} color={color}/>}}
          />
        <Tab.Screen
          name='About Us' component={AboutScreen}
          options={{
            headerTitleAlign:"center",
            tabBarIcon:({color, size})=>
              <MaterialCommunityIcons name="information-outline" size={size} color={color}/>}}
      />
    </Tab.Navigator>
  )
}

export function SearchStack(){
    return(
        <Stack.Navigator>
          <Stack.Screen name="search"  component={SearchScreen} options={{headerTitleAlign:"center", title:"Buscador"}}/>
          <Stack.Screen name="info" component={PokeInfo} options={{headerTitleAlign:"center", title:"Información"}}/>
        </Stack.Navigator>
    )
}

export function BattleStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="battle"  component={BattlerScreen} options={{headerTitleAlign:"center", title:"Pelea"}}/>
      <Stack.Screen name="typesearch" component={TypeSearch} options={{headerTitleAlign:"center", title:"Buscar Tipos"}}/>
      <Stack.Screen name="typetable" component={TypeTable} options={{headerTitleAlign:"center", title:"Info"}}/>
    </Stack.Navigator>
  )
}