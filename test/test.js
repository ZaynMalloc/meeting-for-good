import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

import User from '../server/api/user/user.model';

const should = chai.should();

chai.use(chaiHttp);

describe('Test user API', () => {
  beforeEach((done) => {
    const newUser = new User({
      googleId: 'googletest@email',
      facebookId: 'facebooktest@email',
      emails: ['email1@email.com', 'email2@email'],
      name: 'name',
      avatar: 'avatar',
      accessToken: '12345',
    });
    newUser.save(() => {
      done();
    });
  });
  it('should get a status of 200. Testing GET /api/user', (done) => {
    chai.request(app)
        .get('/api/user')
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(200);
          done();
        });
  });
});
