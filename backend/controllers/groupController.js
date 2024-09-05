const Group = require("../models/Group");
const User = require("../models/User");

const createGroup = async (req, res) => {
    const { name, description, visibility, adminId } = req.body;

    try {
        const newGroup = new Group({
            name,
            description,
            visibility,
            status: 'pending',
            admin: adminId,
            members: [adminId],
            numberOfMembers: 1,
            requestList: []
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ message: 'Error creating group', error: error.message });
    }
}

const getAllGroup = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving groups', error });
    }
}

const getGroupsOfUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const groups = await Group.find({ members: userId });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving groups', error });
    }
}

const getGroupsNotJoinOfUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const groups = await Group.find({ members: { $nin: [userId] } });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving groups', error });
    }
}

const getGroupById = async (req, res) => {
    try {
        const groups = await Group.findById(req.params.id); 
        if (!groups) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving group', error });
    }
}

const addMember = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.params.userId;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        group.members.push(userId);
        group.numberOfMembers = group.members.length;
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error adding member to group', error });
    }
}

const addMemberToRequestList = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.params.userId;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (group.requestList.includes(userId)) {
            return res.status(400).json({ message: 'User already on the request list' });
        }

        if (group.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member of the group' });
        }

        group.requestList.push(userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error adding member to group', error });
    }
}

const removeMember = async (req, res) => {
    try {
        const { groupId, memberId } = req.params;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const memberIndex = group.members.indexOf(memberId);
        if (memberIndex === -1) {
            return res.status(404).json({ message: 'Member not found in the group' });
        }

        group.members.splice(memberIndex, 1);
        group.numberOfMembers = group.members.length;
        await group.save();

        const user = await User.findById(memberId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const groupIndex = user.groups.indexOf(groupId);
        if (groupIndex !== -1) {
            user.groups.splice(groupIndex, 1);
            await user.save();
        }

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error removing member from group', error });
    }
}

const addMemberFromRequestListToGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.params.userId;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const userIndex = group.requestList.indexOf(userId);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found in the request list' });
        }

        group.requestList.splice(userIndex, 1);
        group.members.push(userId);
        group.numberOfMembers = group.members.length;
        await group.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.groups.push(groupId);
        await user.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error adding member to group', error });
    }
}

const removerUserFromRequestList = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.params.userId;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const userIndex = group.requestList.indexOf(userId);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found in the request list' });
        }

        group.requestList.splice(userIndex, 1);
        await group.save();
        res.status(200).json(group);

    } catch (error) {
        res.status(500).json({ message: 'Error removing member from request list', error });
    }
}

const getAllMembers = async (req, res) => {
    try {
        const groupId = req.params.groupId;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const members = await User.find({ _id: { $in: group.members } }).select('-password');
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving members', error });
    }
}

const getAllRequest = async (req, res) => {
    try {
        const groupId = req.params.groupId;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const requestedUsers = await User.find({ _id: { $in: group.requestList } }).select('-password');
        res.status(200).json(requestedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving requests', error });
    }
}

const approveGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        
        group.status = 'approved';
        await group.save();
        
        res.json({ message: 'Group approved successfully', group });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAdmin = async (req, res) => {
    const groupID = req.params.groupID;
    try {
        const group = await Group.findById(groupID).select('admin');
        res.json({ adminId: group.admin });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving admin', error });
    }
};


module.exports = {createGroup, getAllGroup, getGroupsOfUser, getGroupsNotJoinOfUser, getGroupById, addMemberToRequestList, removeMember, addMember, addMemberFromRequestListToGroup, removerUserFromRequestList, getAllMembers, getAllRequest, approveGroup, getAdmin}