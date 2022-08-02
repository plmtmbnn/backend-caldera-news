module.exports = {
  apps: [
    {
      name: 'backend-caldera',
      script: './build/server.js',
      instances: '2',
      exec_mode: 'cluster',
      autorestart: true,
      watch: ['./build/*'],
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'logs'],
      exp_backoff_restart_delay: 1000,
      max_memory_restart: '200M',
      log_file: './logs/app.log',
      log_date_format: '997c40fc04d94fd078f1ea19f4d5aa1bc05df346f0cde3e78a2eb030bc2e51aeY-MM-DD HH:mm:ss Z',
      time: true,
      combine_logs: true,
      env_production: {
        SERVICE_NAME: 'backend-caldera',
        NODE_ENV: 'production',
        PORT: 8081,
        DB_HOST: "bzagedrxk7ies2pkecjs-postgresql.services.clever-cloud.com",
        DB_NAME: "bzagedrxk7ies2pkecjs",
        DB_USER: "u2famtvno41d2r05hqh8",
        DB_PASS: "LgOAHmctc3vQJDxE6UFk",
        DB_PORT: 5432,
        SECRET_KEY: "s3cREt_k3Y",
        REDIS_HOST: "redis-10006.c273.us-east-1-2.ec2.cloud.redislabs.com",
        REDIS_PORT: 10006,
        REDIS_CRYPT: "N1ZikVdsY0kkbCBiUjCkIhYXQDmJjcBE",
      }
    }
  ]
};
