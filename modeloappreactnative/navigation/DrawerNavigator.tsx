import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from './screens/HomeScreen';
import CinemasScreen, { Cinema } from './screens/CinemasScreen';
import CreateCinemaScreen from './screens/CreateCinemaScreen';
import EditCinemaScreen from './screens/EditCinemaScreen';
import SalasScreen, { Sala } from './screens/SalasScreen';
import CreateSalaScreen from './screens/CreateSalaScreen';
import EditSalaScreen from './screens/EditSalaScreen';


export type DrawerParamList = {
  Home: undefined;
  Cinemas: undefined;
  CreateCinema: undefined; 
  EditCinema: { cinema: Cinema };
  Salas: undefined;
  CreateSala: undefined; 
  EditSala: { sala: Sala };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Cinemas"
        component={CinemasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          title: 'Cinemas',
        }}
      />
      <Drawer.Screen
        name="CreateCinema"
        component={CreateCinemaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Criar Cinema' }}
      />
      <Drawer.Screen
        name="EditCinema"
        component={EditCinemaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Cinema' }}
      />
      <Drawer.Screen
        name="Salas"
        component={SalasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          title: 'Salas',
        }}
      />
      <Drawer.Screen
        name="CreateSala"
        component={CreateSalaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Criar Sala' }}
      />
      <Drawer.Screen
        name="EditSala"
        component={EditSalaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Sala' }}
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;