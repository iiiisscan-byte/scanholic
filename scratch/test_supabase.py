import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

print(f"Connecting to: {SUPABASE_URL}")

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("Client created successfully. Fetching site_contents...")
    response = supabase.table("site_contents").select("*").limit(1).execute()
    print("Success!")
    print(response.data)
except Exception as e:
    print(f"Error occurred: {e}")
