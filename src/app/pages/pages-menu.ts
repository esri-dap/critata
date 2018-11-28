// import { NbMenuItem } from '@nebular/theme';

// export const MENU_ITEMS: NbMenuItem[] = [
//   {
//     title: 'Dashboard',
//     icon: 'nb-home',
//     link: '/pages/dashboard',
//     home: true,
//   },
//   {
//     title: 'FEATURES',
//     group: true,
//   },
//   {
//     title: 'Auth',
//     icon: 'nb-locked',
//     children: [
//       {
//         title: 'Login',
//         link: '/auth/login',
//       },
//       {
//         title: 'Register',
//         link: '/auth/register',
//       },
//       {
//         title: 'Request Password',
//         link: '/auth/request-password',
//       },
//       {
//         title: 'Reset Password',
//         link: '/auth/reset-password',
//       },
//     ],
//   },
// ];

import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Peta Existing Ruang Jakarta',
    icon: './../../assets/images/icons/ic_petaExisting_active@4x.png',
    link: '/pages/petaExisting',
    home: true,
  },
  {
    title: 'Peta Rencana Ruang Jakarta',
    icon: 'nb-locked',
    link: '/pages/petaRencana',
  },
  {
    title: 'Peta 3D Jakarta (BETA)',
    icon: 'nb-home',
    link: '/pages/peta3D',
  },
];
