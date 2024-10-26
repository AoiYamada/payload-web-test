import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
// import { authenticated } from '@/access/authenticated'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

// export const MainMenu: GlobalConfig = {
//   slug: 'main-menu',
//   access: {
//     read: () => true,
//     update: authenticated,
//   },
//   fields: [
//     {
//       admin: {
//         components: {
//           RowLabel: '/Header/RowLabels#Tabs',
//         },
//       },
//       name: 'tabs',
//       label: 'Main Menu Items',
//       type: 'array',
//       fields: [
//         {
//           name: 'label',
//           required: true,
//           type: 'text',
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               type: 'checkbox',
//               name: 'enableDirectLink',
//             },
//             {
//               type: 'checkbox',
//               name: 'enableDropdown',
//             },
//           ],
//         },
//         {
//           label: 'Direct Link',
//           type: 'collapsible',
//           admin: {
//             condition: (_, siblingData) => siblingData.enableDirectLink,
//           },
//           fields: [
//             link({
//               appearances: false,
//               disableLabel: true,
//             }),
//           ],
//         },
//         {
//           label: 'Dropdown Menu',
//           type: 'collapsible',
//           admin: {
//             condition: (_, siblingData) => siblingData.enableDropdown,
//           },
//           fields: [
//             {
//               name: 'description',
//               type: 'textarea',
//             },
//             {
//               name: 'descriptionLinks',
//               type: 'array',
//               fields: [
//                 link({
//                   overrides: {
//                     label: false,
//                   },
//                   appearances: false,
//                 }),
//               ],
//             },
//             {
//               name: 'navItems',
//               type: 'array',
//               admin: {
//                 components: {
//                   RowLabel: '/Header/RowLabels#NavItem',
//                 },
//               },
//               fields: [
//                 {
//                   name: 'style',
//                   type: 'select',
//                   defaultValue: 'default',
//                   options: [
//                     {
//                       label: 'Default',
//                       value: 'default',
//                     },
//                     {
//                       label: 'Featured',
//                       value: 'featured',
//                     },
//                     {
//                       label: 'List',
//                       value: 'list',
//                     },
//                   ],
//                 },
//                 {
//                   name: 'defaultLink',
//                   type: 'group',
//                   admin: {
//                     condition: (_, siblingData) => siblingData.style === 'default',
//                   },
//                   fields: [
//                     link({
//                       overrides: {
//                         label: false,
//                       },
//                       appearances: false,
//                     }),
//                     {
//                       name: 'description',
//                       type: 'textarea',
//                     },
//                   ],
//                 },
//                 {
//                   name: 'featuredLink',
//                   type: 'group',
//                   admin: {
//                     condition: (_, siblingData) => siblingData.style === 'featured',
//                   },
//                   fields: [
//                     {
//                       name: 'tag',
//                       type: 'text',
//                     },
//                     {
//                       name: 'label',
//                       type: 'richText',
//                     },
//                     {
//                       name: 'links',
//                       type: 'array',
//                       fields: [
//                         link({
//                           overrides: {
//                             label: false,
//                           },
//                           appearances: false,
//                         }),
//                       ],
//                     },
//                   ],
//                 },
//                 {
//                   name: 'listLinks',
//                   type: 'group',
//                   admin: {
//                     condition: (_, siblingData) => siblingData.style === 'list',
//                   },
//                   fields: [
//                     {
//                       name: 'tag',
//                       type: 'text',
//                     },
//                     {
//                       name: 'links',
//                       type: 'array',
//                       fields: [
//                         link({
//                           overrides: {
//                             label: false,
//                           },
//                           appearances: false,
//                         }),
//                       ],
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
//   hooks: {
//     afterChange: [revalidateHeader],
//   },
// }
