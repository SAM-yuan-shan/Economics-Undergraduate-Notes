# 快速入门UV：新一代Python环境管理器

**来源:** [Bilibili 视频 - 懒人老刘LazyLiu](https://www.bilibili.com/video/BV1JxLEzGEq5/) (发布于 2025-04-25 07:36:37)

## 简介

UV 是一个较新的 Python 工具，旨在替代 `pip` 等传统工具。它集成了多种功能，可以取代 `pip`, `pip-tools`, `poetry` 等。

*   **技术栈:** 使用 Rust 编写，运行速度快（可能比 `pip` 快几十倍）。
*   **功能:** 功能强大，提供全面的环境和包管理。

## 安装

*   **macOS/Linux:**
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```
*   **使用 pip 安装 (如果已有 pip):**
    ```bash
    pip install uv
    ```
    安装后，推荐主要使用 `uv` 命令。

## Python 版本管理

*   **查找已安装版本:**
    ```bash
    uv python list
    ```
*   **查找特定版本:**
    ```bash
    uv python find 3.10
    ```
*   **安装特定版本:**
    ```bash
    uv python install 3.13
    ```

## 项目与虚拟环境

`uv` 的思路是每个文件夹对应一个项目，并为每个项目建立独立的虚拟环境。

*   **初始化项目:**
    ```bash
    uv init
    ```
    该命令会自动创建虚拟环境 (`.venv`) 和配置文件：
    *   `.gitignore`: 预设了需要忽略的文件。
    *   `.python-version`: 指定项目使用的 Python 版本 (例如 `3.13`)。
    *   `pyproject.toml`: 项目配置文件，符合 PEP 标准，可用于发布到 PyPI。
*   **检测与设置环境 (VS Code):**
    *   VS Code 会检测到 `.venv` 并提示设置为项目环境。
    *   手动选择：`Ctrl+Shift+P` -> `Python: Select Interpreter` -> 选择 `.venv`。

## 依赖管理 (`pyproject.toml` & `uv.lock`)

*   **添加依赖:**
    ```bash
    uv add <package_name>
    # 示例
    uv add pandas
    uv add flask
    ```
    依赖会被添加到 `pyproject.toml` 的 `[project.dependencies]` 部分。
*   **查看依赖树:**
    ```bash
    uv tree
    ```
*   **移除依赖:**
    ```bash
    uv remove <package_name>
    # 示例
    uv remove pandas
    ```
    依赖会从 `pyproject.toml` 中移除，`uv` 会自动清理不再需要的包。
*   **锁定依赖 (`uv.lock`):**
    *   `uv` 根据 `pyproject.toml` 和 `.python-version` 生成 `uv.lock` 文件。
    *   `uv.lock` 记录了所有依赖（包括子依赖）的确切版本和来源，保证环境的可复现性。
*   **同步环境:**
    ```bash
    uv sync
    ```
    该命令根据 `uv.lock` 文件安装或更新环境中的包。如果修改了 `.python-version` 或 `pyproject.toml` 中的版本约束，运行 `uv sync` 会重新解析并更新环境。

## 工具管理 (Linter, Formatter等)

`uv` 可以管理仅用于开发或检查目的的工具，而无需将它们作为项目的直接依赖安装。

*   **安装工具:**
    ```bash
    uv tool install <tool_name>
    # 示例
    uv tool install mypy
    uv tool install flake8
    uv tool install ruff
    ```
*   **运行工具:**
    ```bash
    uv tool run <tool_name> [args...]
    # 示例
    uv tool run mypy .
    uv tool run flake8 .
    uv tool run ruff check .
    uv tool run ruff format .
    ```
    *   `ruff`: 由开发 `uv` 的公司 Astral 开发，使用 Rust 编写，速度极快（比 `flake8` 快上百倍），可用于代码检查和格式化。

## 与 Conda 比较

*   **Conda:**
    *   **用户群体:** 主要面向机器学习、数据科学领域。
    *   **优点:** 擅长管理复杂的非 Python 依赖（如 C/C++ 库），可以安装 R 等其他语言，环境配置好后相对稳定。推荐使用 `miniforge` (更快，默认使用 `conda-forge` channel)。
    *   **缺点:** 每个环境相对独立，切换和管理可能不如 `uv` 灵活。
*   **UV:**
    *   **用户群体:** 更偏向通用 Python 开发和程序员。
    *   **优点:** 速度快，语法现代灵活，`pyproject.toml` 符合标准易于发布，环境隔离清晰。
    *   **缺点:** 对于复杂的科学计算栈或非 Python 依赖可能不如 Conda 成熟。每个项目一个环境可能占用较多磁盘空间（但有缓解方法）。

## 高级用法

*   **子项目管理:**
    *   在一个父项目（已有 `.venv`）内创建子项目：
        ```bash
        uv init sub-project-name
        cd sub-project-name
        uv add some-package # 依赖会安装到父项目的 .venv 中
        ```
    *   这样可以在一个 `.venv` 环境中管理多个相关的子项目。
    *   可以为子项目单独初始化 Git 仓库 (`git init`)，并在父项目的 `.gitignore` 中忽略子项目文件夹。
*   **运行单个文件 (无需项目环境):**
    ```bash
    uv run --no-project --with <package_name> python your_script.py
    # 示例 (运行 manim 脚本)
    uv run --no-project --with manim python manim_script.py
    ```
    `uv` 会临时下载所需包并运行脚本，非常适合快速测试或运行一次性脚本。

## 与 `pip` 集成

`uv` 保留了执行 `pip` 命令的能力。

*   **使用 `pip` 命令安装:**
    ```bash
    uv pip install <package_name>
    # 示例 (安装特定 PyTorch 版本)
    uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
    ```
    这在需要使用 `pip` 特定参数或安装方式时非常有用。