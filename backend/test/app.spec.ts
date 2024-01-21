import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/app';
import * as helper from '../src/helpers/helpers';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Root Endpoint', () => {
  it('should return a success message', done => {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.msg).to.equal('Encryption and Verification Initialized');
        done();
      });
  });
});

describe('/api/encrypt', () => {
  let encryptMessageStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore(); // Restores all stubs
  });

  it('should handle encryption failure', done => {
    // Stubbing encryptMessage to simulate failure
    encryptMessageStub = sinon.stub(helper, 'encryptMessage').returns(Promise.resolve(undefined));

    const testMessage = { message: 'Test Message' };
    chai.request(app)
      .post('/api/encrypt')
      .send(testMessage)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Failed to encrypt message');
        done();
      });
  });

  it('should successfully encrypt a message', done => {
    // Stubbing encryptMessage to simulate successful encryption
    const mockEncryptedMessage = 'mockEVMAddress:mockEncryptedMessagePart';
    encryptMessageStub = sinon.stub(helper, 'encryptMessage').returns(Promise.resolve(mockEncryptedMessage));

    const testMessage = { message: 'Test Message' };
    chai.request(app)
      .post('/api/encrypt')
      .send(testMessage)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('evmAddress', 'encryptedMessage');
        expect(res.body.evmAddress).to.equal('mockEVMAddress');
        expect(res.body.encryptedMessage).to.equal('mockEncryptedMessagePart');
        done();
      });
  });

  // Additional tests...
});

describe('/api/decrypt', () => {
  let decryptMessageStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore();
  });

  it('should successfully decrypt a message', done => {
    // Stubbing decryptMessage to simulate successful decryption
    const mockDecryptedMessage = 'Original Message';
    decryptMessageStub = sinon.stub(helper, 'decryptMessage').returns(Promise.resolve(mockDecryptedMessage));

    const testPayload = {
      encryptedMessage: 'ivHexString:encryptedMessagePart',
      evmAddress: 'mockEVMAddress'
    };

    chai.request(app)
      .post('/api/decrypt')
      .send(testPayload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('decryptedMessage', mockDecryptedMessage);
        done();
      });
  });

});

