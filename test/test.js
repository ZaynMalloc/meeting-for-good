import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJSONSchema from 'chai-json-schema';
import app from '../server/app';

import User from '../server/api/user/user.model';

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);
chai.use(chaiJSONSchema);

describe('Test user API', () => {
  beforeEach((done) => {
    console.log(User);
    User.insertMany([{
      googleId: 'googletest@email',
      facebookId: 'facebooktest@email',
      emails: ['email1@email.com', 'email2@email'],
      name: 'name',
      avatar: 'avatar',
      accessToken: '12345',
      refreshToken: '54321',
      enablePrimaryCalendar: true,
      GoogleSelectedCalendars: ['1', '2', '3'],
    },
    {
      facebookId: 'myfacebook@email',
      emails: ['hello@email.com', 'myemail@email', 'myemail2@email'],
      name: 'name2',
      accessToken: '11111',
      refreshToken: '00000',
      enablePrimaryCalendar: true,
      GoogleSelectedCalendars: ['4', '6'],
    },
    {
      googleId: 'mygoogle@email',
      emails: ['mail@email.com', 'username@email'],
      name: 'name',
      avatar: 'avatar',
      accessToken: '77777',
      refreshToken: '99999',
      enablePrimaryCalendar: false,
      GoogleSelectedCalendars: ['99', '11', '00'],
    }]).exec();
    done();
  });
});
it('should get a status of 200. Testing GET /api/user', (done) => {
  chai.request(app)
        .get('/api/user')
        .end((err, res) => {
         // console.log(User);
          console.log(res.body);
          expect(res.body).to.be.jsonSchema(2);
         // console.log(res.status)
          expect(res.status).equal(200);
        //  res.should.have.status(200);
          done();
        });
});
