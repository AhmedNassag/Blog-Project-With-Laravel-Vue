<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\User::create([
            'name'       =>'Ahmed Nassag',
            'email'      =>'ahmednassag@yahoo.com',
            'password'   =>bcrypt('20111993'),
            'profile_img'=>'profile_img1.jpg'
        ]);
    }
}
