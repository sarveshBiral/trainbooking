#!/bin/bash
echo "🛑 Stopping Services via Ansible..."
ansible-playbook -i ansible/inventory ansible/teardown_app.yaml
echo "✅ Teardown complete!"
