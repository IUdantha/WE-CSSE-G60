const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('backend\test\server.js'); 
const should = chai.should();

chai.use(chaiHttp);

describe('Income Controller', () => {
  let sampleIncomeId;

  describe('POST /incomes', () => {
    it('should store a new income', (done) => {
      const newIncome = {
        incomeRouteId: '123',
        incomeBusId: '456',
        incomeLoad: 100,
        incomeDate: '2023-10-24',
        incomeIncome: 1000,
        incomeExpenses: 500,
        incomeProfit: 500,
      };

      chai.request(server)
        .post('/incomes')
        .send(newIncome)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('incomeRouteId').eql('123');
          res.body.should.have.property('incomeBusId').eql('456');
          // Add more property assertions as needed
          sampleIncomeId = res.body._id; // Store the ID for later tests
          done();
        });
    });

    it('should not store an income with missing fields', (done) => {
      const incompleteIncome = {
        incomeRouteId: '123',
        incomeBusId: '456',
        incomeLoad: 100,
        incomeDate: '2023-10-24',
        incomeIncome: 1000,
        incomeExpenses: null,
        incomeProfit: null,
      };

      chai.request(server)
        .post('/incomes')
        .send(incompleteIncome)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('All fields are required');
          done();
        });
    });
  });

  describe('GET /incomes', () => {
    it('should get all incomes', (done) => {
      chai.request(server)
        .get('/incomes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });

    it('should get a single income by ID', (done) => {
      chai.request(server)
        .get(`/incomes/${sampleIncomeId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id').eql(sampleIncomeId);
          done();
        });
    });
  });

  describe('PUT /incomes/:id', () => {
    it('should update an income', (done) => {
      const updatedIncome = {
        incomeRouteId: '123',
        incomeBusId: '456',
        incomeLoad: 1000,
        incomeDate: '2023-10-24',
        incomeIncome: 10000,
        incomeExpenses: 1000,
        incomeProfit: 1000,
      };

      chai.request(server)
        .put(`/incomes/${sampleIncomeId}`)
        .send(updatedIncome)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          // Add assertions for the updated fields
          done();
        });
    });
  });

  describe('DELETE /incomes/:id', () => {
    it('should delete an income', (done) => {
      chai.request(server)
        .delete(`/incomes/${sampleIncomeId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Income removed');
          done();
        });
    });
  });

});
