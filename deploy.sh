#!/bin/bash
echo "🚀 Starting Deployment via Ansible..."
ansible-playbook -i ansible/inventory ansible/deploy_app.yaml
echo "✅ Deployment trigger sent!"
