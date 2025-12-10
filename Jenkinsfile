pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "saadtw/nodejs-cicd-app"
        DOCKER_TAG = "latest"
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository from GitHub...'
                git branch: 'main', url: 'https://github.com/saadtw/nodejs-cicd-pipeline.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }
        
        stage('Run Docker Container') {
            steps {
                echo 'Stopping old container if exists...'
                sh 'docker stop nodejs-app || true'
                sh 'docker rm nodejs-app || true'
                
                echo 'Running new Docker container...'
                sh "docker run -d -p 5000:5000 --name nodejs-app ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}