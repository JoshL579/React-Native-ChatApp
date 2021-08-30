import subprocess
import os


def join_current_dir():
    os.getcwd()
    process = subprocess.run(['cd', os.getcwd()], capture_output=True, text=True)
    if process.returncode == 0:
        return True
    return False


def update_code():
    process = subprocess.run('git pull', capture_output=True, text=True, shell=True, cwd=os.getcwd())
    if process.returncode == 0:
        return True
    return False


def deploy_server(base_dir):
    sh = 'pipenv install && pipenv shell && python3 app.py'
    process = subprocess.run(
        sh, capture_output=True,  text=True, shell=True,
        cwd=os.path.join(base_dir, 'server')
    )
    print(process.stdout)
    if process.returncode == 0:
        return False
    return False


def deploy_client(base_dir):
    sh = 'yarn install && yarn start'
    process = subprocess.run(
        sh, capture_output=True, text=True, shell=True,
        cwd=os.path.join(base_dir, 'client')
    )
    print(process.stdout)
    if process.returncode == 0:
        return True
    return False


def deploy(base_dir):
    git_status = update_code()
    if not git_status:
        return False

    # server_status = deploy_server(base_dir)
    # if not server_status:
    #     print('server deployed fail')
    #     return False
    # print('server deployed successfully')

    # client_status = deploy_client(base_dir)
    # if not client_status:
    #     print('client deployed fail')
    #     return False
    # print('client deployed successfully')

    return True

