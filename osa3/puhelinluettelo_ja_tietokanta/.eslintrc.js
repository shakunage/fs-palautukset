module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
	'eqeqeq': 'error',
	'object-curly-spacing': [
        'error', 'always'
   	 ],
   	 'arrow-spacing': [
        'error', { 'before': true, 'after': true }
   	 ],
        'semi': [
            'error',
            'never'
        ],
	'no-console': 0
    }
}
