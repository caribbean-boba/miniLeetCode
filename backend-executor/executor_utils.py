'''
Only implemented java now. Will implement Python in the future.
'''
import uuid
import docker
import shutil
import os
from docker.errors import *

IMAGE_NAME = "yanhanlyu/mini-leet-code"
CURRENT_DIR = os.path.dirname(os.path.relpath(__file__))
TEMP_BUILD_DIR = "%s/tmp/" % CURRENT_DIR
SOURCE_FILE_NAMES = {
    "java": "Solution.java",
}
BINARY_NAMES = {
    "java": "Solution",
}
BUILD_COMMANDS = {
    "java": "javac",
}
RUN_COMMANDS = {
    "java": "java",
}

client = docker.from_env()

def make_dir(dir):
    try:
        os.mkdir(dir)
        print ("Temp successfully built")
    except OSError:
         print ("Temp built failed")

def load_image():
    try:
        client.images.get(IMAGE_NAME)
    except ImageNotFound:
        print ("Image Not Found Locally. Try to load from Dockerhub")
        client.images.pull(IMAGE_NAME)
    except APIError:
        print ("Image not Found locally. Dockerhub could not be accessed.")
        return
    print ("IMAGE SUCCESSFULLY LOADED")


def build_and_run(user_code, selected_lang):
    # print ('\n\n\n\n\n')
    # print ("here")
    # print ('\n\n\n\n\n')
    result = {'build': None, 'run': None, 'error': None}
    source_file_parent_dir_name = uuid.uuid4()
    source_file_host_dir = "%s/%s" % (TEMP_BUILD_DIR, source_file_parent_dir_name)
    source_file_guest_dir = "/run/%s" % (source_file_parent_dir_name)
    make_dir(source_file_host_dir)
    with open("%s/%s" % (source_file_host_dir, SOURCE_FILE_NAMES[selected_lang]), 'w') as source_file:
        source_file.write(user_code)
    # docker
    try:
        client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (BUILD_COMMANDS[selected_lang], SOURCE_FILE_NAMES[selected_lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir
        )
        print('Source successfully built')
        result['build'] = 'OK'
    except ContainerError as e:
        print('Source built failed')
        result['build'] = str(e.stderr, 'utf-8')
        shutil.rmtree(source_file_host_dir)
        return result
    try:
        log = client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (RUN_COMMANDS[selected_lang], BINARY_NAMES[selected_lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir
        )
        print('Excution successfully built')
        log = str(log, 'utf-8')
        result['run'] = log
    except ContainerError as e:
        print('Excution built failed')
        result['run'] = str(e.stderr, 'utf-8')
        shutil.rmtree(source_file_host_dir)
        return result
    shutil.rmtree(source_file_host_dir)
    return result
    shutil.rmtree(source_file_host_dir)
