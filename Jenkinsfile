pipeline {
    agent any

    environment {
        TEST_DIR = 'tests'
        REPORT_DIR = 'playwright-report'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.58.2-jammy'
                    args "-v $WORKSPACE:/app -w /app"
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Run Playwright Tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.58.2-jammy'
                    args "-v $WORKSPACE:/app -w /app"
                }
            }
            steps {
                sh 'npx playwright install'
                sh 'npm test'
            }
        }
    }

    post {
        always {
            junit "${REPORT_DIR}/junit-report.xml"
        }
    }
}
