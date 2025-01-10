pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials-id') // Remplacez par vos credentials
        DOCKER_IMAGE = 'your-dockerhub-username/gestion-formation'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/votre-repo/gestion-formations.git' // Remplacez par votre URL Git
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        stage('Scan Docker Image') {
            steps {
                sh 'docker run --rm aquasec/trivy image $DOCKER_IMAGE'
            }
        }
        stage('Push Docker Image') {
            steps {
                sh '''
                echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin
                docker push $DOCKER_IMAGE
                '''
            }
        }
    }
}
