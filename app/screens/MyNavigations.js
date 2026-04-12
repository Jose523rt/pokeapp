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
import WinScreen from "./battler/WinScreen";

// Pantalla Pokemon
import PokeScreen from "./pokemon/PokeScreen";

// Pantalla de Búsqueda
import SearchScreen from "./search/SearchScreens";

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
            headerTitleAlign:"center",
            tabBarIcon:({color, size})=>
              <MaterialCommunityIcons name="pokeball" size={size} color={color}/>}}
          />
        <Tab.Screen
          name='Buscador' component={SearchScreen}
          options={{
            headerTitleAlign:"center",
            tabBarIcon:({color, size})=>
              <MaterialCommunityIcons name="magnify" size={size} color={color}/>}}
          />
        <Tab.Screen
          name='Battler' component={BattlerScreen}
          options={{
            headerTitleAlign:"center",
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
      <Tab.Screen
        name="Tipos"
        component={TypeTable}
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="table"
              size={size}
              color={color} 
                         />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

//no nada