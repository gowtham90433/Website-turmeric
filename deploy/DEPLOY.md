# Deploying to a Hetzner VPS

Full path from zero to a live site on your own server. Do these in order.
Steps 1–4 happen in your browser; steps 5+ happen in a terminal.

## 1. Buy a domain

Go to [namecheap.com](https://www.namecheap.com), search for a name (e.g.
`suvarnaturmeric.com`), and buy it. ~$10–15/year for a `.com`. Any registrar
works the same way (GoDaddy, Porkbun, Google Domains) — the steps below are
the same regardless of where you buy it.

## 2. Create the server

1. Sign up at [hetzner.com/cloud](https://www.hetzner.com/cloud).
2. Create a new project, then "Add Server".
3. **Location**: pick the region closest to your main customers.
4. **Image**: Ubuntu 24.04.
5. **Type**: the cheapest shared vCPU plan (CX22, ~€4.35/mo) — plenty for a
   static site.
6. **SSH key**: add your public key here (see step 3 if you don't have one
   yet) — this lets you log in without a password.
7. Create the server. Note its **public IP address** — you'll need it below.

## 3. Set up an SSH key (if you don't have one)

On your own computer:

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Press enter through the prompts. Then print the public key and paste it into
Hetzner's "SSH key" field when creating the server:

```bash
cat ~/.ssh/id_ed25519.pub
```

## 4. Point your domain at the server

In your domain registrar's DNS settings, add:

| Type | Name | Value              |
|------|------|---------------------|
| A    | @    | your server's IP    |
| A    | www  | your server's IP    |

DNS changes can take a few minutes to a few hours to propagate.

## 5. First-time server setup

SSH into the server as root:

```bash
ssh root@YOUR_SERVER_IP
```

Then run:

```bash
# Create a non-root user for deploys
adduser deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Basic firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Install nginx and certbot (for free HTTPS)
apt update
apt install -y nginx certbot python3-certbot-nginx

# Site directory
mkdir -p /var/www/website-turmeric
chown -R deploy:deploy /var/www/website-turmeric
```

## 6. Configure nginx

Still as root (or `sudo` as the `deploy` user), copy `deploy/nginx.conf` from
this repo to the server — easiest way is to open it on your own machine,
replace `YOUR_DOMAIN` with your real domain in both places, then paste it in:

```bash
nano /etc/nginx/sites-available/website-turmeric
# paste the edited contents, save (Ctrl+O, Enter, Ctrl+X)

ln -s /etc/nginx/sites-available/website-turmeric /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default   # remove the nginx welcome page
nginx -t && systemctl reload nginx
```

## 7. Enable HTTPS

Once DNS is pointing at the server (check with `dig YOUR_DOMAIN`):

```bash
certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN
```

Follow the prompts (enter your email, agree to terms, choose "redirect HTTP
to HTTPS" when asked). Certbot auto-renews the certificate going forward.

## 8. Deploy the site

From your own machine, in the project folder:

```bash
./deploy/deploy.sh
```

(First edit `SERVER_USER` and `SERVER_IP` at the top of `deploy/deploy.sh` —
`SERVER_USER` is `deploy`, `SERVER_IP` is the address from step 2.)

Visit `https://YOUR_DOMAIN` — the site should be live.

## Future updates

Whenever you push new changes and want them live, just run
`./deploy/deploy.sh` again — it rebuilds and re-uploads.
