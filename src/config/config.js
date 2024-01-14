import yaml from '!!yaml-loader!./config.yml';

export let config;
if (process.env.NODE_ENV === 'production') {
    config = yaml.production;
} else {
    config = yaml.production;
}