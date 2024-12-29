import getDbInstance from '../index.js'

import { categoryList } from '../../utils/constants.js'
import { categories } from '../schema/category.js'
import { proxy } from '../schema/proxy.js'

const proxyList = [
  {
  name: "Denmark 1",
  address: "http://152.115.56.43:8111",
  online: true,
  country: "DK"
},
  {
    name: "Denmark 2",
    address: "http://80.63.84.58:8081",
    online: true,
    country: "DK"
  },
  {
    name: "Denmark 3",
    address: "http://86.52.40.119:8081",
    online: true,
    country: "DK"
  },
  {
    name: "Denmark 4",
    address: "https://147.161.155.102:11316",
    online: true,
    country: "DK"
  },
  {
    name: "Denmark 5",
    address: "http://146.70.92.251:3128",
    online: true,
    country: "DK"
  },
  {
    name: "Denmark 6",
    address: "http://146.70.92.252:3128",
    online: true,
    country: "DK"
  },
  {
    name: "Denmark 7",
    address: "http://146.70.80.24:3128",
    online: true,
    country: "DK"
  },
  {
    name: "Denmark 8",
    address: "http://45.95.115.125:3128",
    online: true,
    country: "DK"
  },
  {
    name: "Denmark 9",
    address: "http://87.238.253.68:80",
    online: true,
    country: "DK"
  },
  {
    name: "Denmark 10",
    address: "https://146.70.80.76:80",
    online: true,
    country: "DK"
  },
  {
    name: "Denmark 11",
    address: "http://185.107.90.61:3128",
    online: true,
    country: "DK"
  }
]
async function seed () {
  const db = await getDbInstance()

  try {

    const inserted = await db.insert(proxy).values(proxyList).returning()

    console.log('Seed data inserted successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seed()
