/**
 * params.mjs
 */

import pino from 'pino';

export default {
  logOptions: {
    level: 'info',
    prettyPrint: true,
    serializers: {err: pino.stdSerializers.err},
    browser: {asObject: true}
  },

  keyParams: {
    keyType: 'EC',
    namedCurve: 'P-256'
  },

  webCryptoKeyParamsEC: { // just for key generation for ECDH and ECDSA
    algo: {
      name: 'ECDSA',
      hash: { name: 'SHA-256' } // hash is used for signing and verification. never used for key generation.
    },
    extractable: true, // to export private key as PEM
    keyUsage: ['sign', 'verify']
  },

  hashes: {
    'SHA-256': {name: 'sha256', hashSize: 32},
    'SHA-384': {name: 'sha384', hashSize: 48},
    'SHA-512': {name: 'sha512', hashSize: 64}
  },

  curves: {
    'P-256': {name: 'p256', nodeName: 'prime256v1', payloadSize: 32, oid: [1, 2, 840, 10045, 3, 1, 7]},
    'P-384': {name: 'p384', nodeName: 'secp384r1', payloadSize: 48, oid: [1, 3, 132, 0, 34]},
    'P-521': {name: 'p521', nodeName: 'secp521r1', payloadSize: 66, oid: [1, 3, 132, 0, 35]}
  },

  ciphers: {
    'AES-GCM': {prefix: 'aes', suffix: 'gcm', ivLength: 12, tagLength: 16}  // 12 bytes is recommended for AES-GCM
  }
};