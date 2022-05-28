<?php

use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\Setting::create([
            'site_name'    =>'Ahmed Nabil',
            'contact_email'=>'ahmednassag@gmail.com',
            'address'      =>'address example here'
        ]);
    }
}
