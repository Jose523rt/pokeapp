import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
import PokeScreen from './pokemon/PokeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ── Paleta ────────────────────────────────────────────────────
const C = {
  red:    '#CD2B2B',
  yellow: '#F5D800',
  white:  '#FFFFFF',
  dark:   '#1A1A1A',
};

// ── Opciones globales del Tab Navigator ───────────────────────
const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: C.red,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: C.dark,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    height: 60,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabBarActiveTintColor: C.yellow,    // ícono + label activo → amarillo
  tabBarInactiveTintColor: C.white,   // ícono + label inactivo → blanco
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
};

// ── Opciones globales del Stack Navigator ─────────────────────
const stackHeaderOptions = {
  headerStyle: {
    backgroundColor: C.red,
    elevation: 4,
    shadowColor: C.dark,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitleStyle: {
    color: C.white,
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  headerTintColor: C.white,   // flecha "atrás" en blanco
  headerTitleAlign: 'center',
};

export function MyNavigations() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
    <Tab.Screen
        name='Team'
        component={TeamStack}   
        options={{
          headerShown: false, 
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons name="pokeball" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name='Buscador'
        component={SearchStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons name="magnify" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name='Pelea'
        component={BattleStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons name="boxing-glove" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name='Perfil'
        component={AboutScreen}
        options={{
          ...stackHeaderOptions,
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons name="information-outline" size={size} color={color} />,
        }}
      />
      
    </Tab.Navigator>
  );
}

export function SearchStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen name="search" component={SearchScreen} options={{ title: 'Buscador' }} />
      <Stack.Screen name="info" component={PokeInfo} options={{ title: 'Información' }} />
    </Stack.Navigator>
  );
}

export function BattleStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen name="battle"     component={BattlerScreen} options={{ title: 'Pelea' }} />
      <Stack.Screen name="typesearch" component={TypeSearch}    options={{ title: 'Buscar Tipos' }} />
      <Stack.Screen name="typetable"  component={TypeTable}     options={{ title: 'Infomacion sobre Tipo' }} />
    </Stack.Navigator>
  );
}
  export function TeamStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen name="team" component={TeamScreen} options={{ title: 'Mi Equipo' }} />
      <Stack.Screen name="info" component={PokeScreen} options={{ title: 'Información' }} />
    </Stack.Navigator>
  );
}
