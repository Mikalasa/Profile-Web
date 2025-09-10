module.exports = {
    extends: ['react-app'],
    rules: {
        'no-unused-vars': 'warn',
        'jsx-a11y/iframe-has-title': 'warn',
        'jsx-a11y/alt-text': 'warn',
        'jsx-a11y/anchor-is-valid': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'import/extensions': [
            'warn',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never'
            }
        ],
        'no-warning-comments': 'warn',
    },
};
