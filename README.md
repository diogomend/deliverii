# Deliverii 
## Food delivery application 
## About the project 
Full stack application composed by two main modules:
- [Deliverii Server](deliverii-server/README.md)
REST API that allows accesses from both Customers and Restaurant Managers.
This api was built using NestJS

- [Deliverii Web](deliverii-web/README.md)
Single-Page application that supports PWA that was built using VueJS

## Features
### Customer
1. List restaurants
2. View meals 
3. Place order
5. List orders
4. Change order status (incl. cancel)

### Restaurant Manager
1. CRUD operations in restaurants and meals
2. List orders for restaurant(s)
3. Change order status
4. Add customer to restaurant's blacklist 

## Database
MongoDB with instances created in Atlas from https://cloud.mongodb.com/.
