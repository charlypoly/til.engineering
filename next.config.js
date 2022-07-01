const nextra = require('nextra');

module.exports = nextra('./components/layout.js')({
  experimental: {
    turboMode: true,
  },
  // unstable_faviconGlyph: '💡',
  images: {
    domains: ['pbs.twimg.com', 'abs.twimg.com'],
  },
  headers() {
    return [
      {
        source: '/atom/:nested*',
        headers: [
          {
            key: 'content-type',
            value: 'text/xml',
          },
        ],
      },
    ];
  },
});
