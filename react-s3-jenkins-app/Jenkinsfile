pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        S3_BUCKET_DEV = 'my-react-app-devs'
        S3_BUCKET_PROD = 'my-react-app-prods'
        SONAR_SERVER = 'http://18.212.218.156:9000/projects'
        // Removed dynamic BRANCH_NAME assignment
    }

    tools {
        nodejs 'Node14'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test -- --coverage'
            }
        }

        stage('SonarQube Analysis') {
            when {
                expression {
                    def branch = env.BRANCH_NAME ?: ''
                    return branch == 'develop' || branch.startsWith('feature/')
                }
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npm run test -- --coverage'
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Dev') {
            when {
                expression {
                    return env.BRANCH_NAME == 'develop'
                }
            }
            steps {
                withAWS(region: "${env.AWS_REGION}", credentials: 'aws-credentials') {
                    sh "aws s3 sync build/ s3://${env.S3_BUCKET_DEV} --delete"
                }
            }
        }

        stage('Deploy to Production') {
            when {
                expression {
                    return ['main', 'master'].contains(env.BRANCH_NAME)
                }
            }
            steps {
                withAWS(region: "${env.AWS_REGION}", credentials: 'aws-credentials') {
                    sh "aws s3 sync build/ s3://${env.S3_BUCKET_PROD} --delete"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
