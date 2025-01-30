# LFS Akairo Example - Quick Start Guide

This repository provides an example implementation of [LFS Akairo](https://github.com/MrSev7en/lfs-akairo) to help you get started quickly.

## Requirements

- **Node.js**: Version 20.0.0 or later.
- **pnpm**: Recommended package manager.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/MrSev7en/lfs-akairo-example.git
   cd lfs-akairo-example
   ```

2. **If you don't have pnpm installed, you can install it using the command below:**
   ```sh
   npm install --global pnpm
   ```

3. **Install dependencies:**
   ```sh
   pnpm install
   ```

4. **Configure environment variables:**
   - Copy the example environment file:

     - Windows:
       ```sh
       copy .env.example .env
       ```
     - macOS/Linux
       ```sh
       cp .env.example .env
       ```
   - Open `.env` and fill in the required fields with your server details.

5. **Start the application:**
   ```sh
   pnpm dev
   ```

## Contributing

Feel free to fork the repository and submit pull requests for improvements or new features.

---

Enjoy using LFS Akairo Example!
